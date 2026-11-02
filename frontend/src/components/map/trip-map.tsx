"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import type { Map as LeafletMap, Marker as LeafletMarker, Polyline as LeafletPolyline, TileLayer as LeafletTileLayer } from "leaflet";
import Image from "next/image";
import {
  Plus,
  Minus,
  Maximize2,
  MapPin,
  Calendar,
  Wallet,
  Clock,
  ExternalLink,
  Sparkles,
  Compass,
  Layers,
  Send,
  Navigation,
  CheckCircle2,
  X,
  Phone,
  Mail,
  User as UserIcon,
} from "lucide-react";
import { NeoButton } from "@/components/ui/neo-button";
import { Badge } from "@/components/ui/badge";
import { resolvePlaceImageUrl } from "@/lib/place-images";
import type { Trip, TripStop, ItineraryActivity, Destination, Activity } from "@/types";

interface TripMapProps {
  trip?: Trip;
  destinations?: Destination[];
  activities?: (ItineraryActivity | Activity)[];
  selectedStopId?: string;
  selectedActivityId?: string;
  onSelectStop?: (stop: TripStop | Destination) => void;
  onSelectActivity?: (act: ItineraryActivity | Activity) => void;
  selectedDay?: string | number | "all";
  onDayChange?: (day: string | number | "all") => void;
  height?: string;
  interactive?: boolean;
  showControls?: boolean;
  showLegend?: boolean;
  className?: string;
}

const GOOGLE_MAPS_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
  "AIzaSyBjAyW_UtiIA5KbQ82s2Ra8xI_Fjs08uDs";

const GOOGLE_SCRIPT_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
  process.env.GOOGLE_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbzdO8osbaxBSqV904coVIhObOGywdplkrmEcb3xeRWSv3YQPh3iN4NrZCkU1UpHGHU/exec";

// Karnataka central coordinates
const KARNATAKA_CENTER: [number, number] = [14.5204, 75.7224];
const KARNATAKA_DEFAULT_ZOOM = 7;

type MapLayerType = "google_roadmap" | "google_satellite" | "google_terrain" | "carto_voyager";

export const TripMap: React.FC<TripMapProps> = ({
  trip,
  destinations = [],
  activities = [],
  selectedStopId,
  selectedActivityId,
  onSelectStop,
  onSelectActivity,
  selectedDay = "all",
  onDayChange,
  height = "840px",
  interactive = true,
  showControls = true,
  showLegend = true,
  className = "",
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const tileLayerRef = useRef<LeafletTileLayer | null>(null);
  const markersRef = useRef<LeafletMarker[]>([]);
  const polylineRef = useRef<LeafletPolyline | null>(null);
  const shadowPolylineRef = useRef<LeafletPolyline | null>(null);

  const [activeLayer, setActiveLayer] = useState<MapLayerType>("google_roadmap");
  const [activeDay, setActiveDay] = useState<string | number | "all">(selectedDay);
  const [activePopupInfo, setActivePopupInfo] = useState<{
    type: "stop" | "activity";
    data: any;
  } | null>(null);

  // Inquiry form modal state for Karnataka tour desk
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryPlace, setInquiryPlace] = useState("");
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryNotes, setInquiryNotes] = useState("");
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);

  // Derive stops and points
  const stopsList = useMemo(() => {
    if (trip && trip.stops && trip.stops.length > 0) {
      return trip.stops;
    }
    if (destinations && destinations.length > 0) {
      return destinations.map((d, index) => ({
        id: d.id,
        trip_id: "draft",
        destination_id: d.id,
        destination: d,
        arrival_date: "",
        departure_date: "",
        order: index + 1,
        activities: [],
        accommodations: [],
      })) as TripStop[];
    }
    return [];
  }, [trip, destinations]);

  // Derive all activities
  const allActivitiesList = useMemo(() => {
    if (activities && activities.length > 0) return activities;
    const collected: (ItineraryActivity & { cityName?: string })[] = [];
    stopsList.forEach((s) => {
      s.activities?.forEach((a) => {
        collected.push({
          ...a,
          cityName: s.destination?.city || s.destination?.name,
          latitude: a.latitude ?? (s.destination?.latitude ? Number(s.destination.latitude) : undefined),
          longitude: a.longitude ?? (s.destination?.longitude ? Number(s.destination.longitude) : undefined),
        });
      });
    });
    return collected;
  }, [activities, stopsList]);

  // Extract distinct days for day-filter controls
  const tripDays = useMemo(() => {
    const days: { id: string | number; label: string; date?: string }[] = [{ id: "all", label: "All Route" }];
    const uniqueDates = Array.from(
      new Set(allActivitiesList.map((a) => (a as ItineraryActivity).date).filter(Boolean))
    ).sort();

    uniqueDates.forEach((d, i) => {
      days.push({
        id: d,
        label: `Day ${i + 1}`,
        date: d,
      });
    });

    if (days.length === 1 && stopsList.length > 0) {
      stopsList.forEach((s, i) => {
        days.push({
          id: s.id,
          label: `Stop ${i + 1}`,
        });
      });
    }
    return days;
  }, [allActivitiesList, stopsList]);

  // Get tile URL for current layer type
  const getTileConfig = (layerType: MapLayerType) => {
    switch (layerType) {
      case "google_satellite":
        return {
          url: `https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&key=${GOOGLE_MAPS_API_KEY}`,
          maxZoom: 20,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
        };
      case "google_terrain":
        return {
          url: `https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}&key=${GOOGLE_MAPS_API_KEY}`,
          maxZoom: 20,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
        };
      case "carto_voyager":
        return {
          url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
          maxZoom: 19,
          subdomains: "abcd",
        };
      case "google_roadmap":
      default:
        return {
          url: `https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=${GOOGLE_MAPS_API_KEY}`,
          maxZoom: 20,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
        };
    }
  };

  // Initialize Leaflet Map centered on Karnataka
  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let isMounted = true;

    const initMap = async () => {
      const L = (await import("leaflet")).default;

      // Avoid double initialization
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      if (!mapContainerRef.current) return;

      if ((mapContainerRef.current as any)._leaflet_id) {
        (mapContainerRef.current as any)._leaflet_id = null;
      }

      // Default center: Karnataka (Pravasan Karnataka Tour & Travel Hub)
      const map = L.map(mapContainerRef.current, {
        center: KARNATAKA_CENTER,
        zoom: KARNATAKA_DEFAULT_ZOOM,
        zoomControl: false,
        attributionControl: false,
        dragging: interactive,
        touchZoom: interactive,
        scrollWheelZoom: interactive,
      });

      const tileCfg = getTileConfig(activeLayer);
      const tile = L.tileLayer(tileCfg.url, {
        maxZoom: tileCfg.maxZoom,
        subdomains: tileCfg.subdomains as any,
      }).addTo(map);
      tileLayerRef.current = tile;

      if (isMounted) {
        mapInstanceRef.current = map;
        renderMapLayers(L, map);
      }
    };

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      if (mapContainerRef.current) {
        (mapContainerRef.current as any)._leaflet_id = null;
      }
    };
  }, []);

  // Switch Tile Layer smoothly when activeLayer changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    import("leaflet").then((module) => {
      const L = module.default;
      if (tileLayerRef.current && mapInstanceRef.current) {
        mapInstanceRef.current.removeLayer(tileLayerRef.current);
      }
      if (!mapInstanceRef.current) return;
      const tileCfg = getTileConfig(activeLayer);
      const newTile = L.tileLayer(tileCfg.url, {
        maxZoom: tileCfg.maxZoom,
        subdomains: tileCfg.subdomains as any,
      }).addTo(mapInstanceRef.current);
      tileLayerRef.current = newTile;
    });
  }, [activeLayer]);

  // Update layers whenever stops, activities, activeDay, or selected ids change
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    import("leaflet").then((module) => {
      const L = module.default;
      renderMapLayers(L, mapInstanceRef.current!);
    });
  }, [stopsList, allActivitiesList, activeDay, selectedStopId, selectedActivityId]);

  // Handle programmatic selection focus
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (selectedStopId) {
      const match = stopsList.find((s) => s.id === selectedStopId);
      if (match && match.destination?.latitude && match.destination?.longitude) {
        const lat = Number(match.destination.latitude);
        const lng = Number(match.destination.longitude);
        mapInstanceRef.current.flyTo([lat, lng], 12, { duration: 1.2 });
        setActivePopupInfo({ type: "stop", data: match });
      }
    } else if (selectedActivityId) {
      const match = allActivitiesList.find((a) => a.id === selectedActivityId);
      if (match && match.latitude && match.longitude) {
        const lat = Number(match.latitude);
        const lng = Number(match.longitude);
        mapInstanceRef.current.flyTo([lat, lng], 13, { duration: 1.2 });
        setActivePopupInfo({ type: "activity", data: match });
      }
    }
  }, [selectedStopId, selectedActivityId, stopsList, allActivitiesList]);

  const renderMapLayers = (L: any, map: LeafletMap) => {
    // Clear old markers & polyline
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }
    if (shadowPolylineRef.current) {
      shadowPolylineRef.current.remove();
      shadowPolylineRef.current = null;
    }

    const latLngs: [number, number][] = [];

    // Filter stops according to activeDay
    const visibleStops = stopsList.filter((stop) => {
      if (activeDay === "all") return true;
      if (typeof activeDay === "string" && activeDay === stop.id) {
        return true;
      }
      return true;
    });

    // ─── 1. Render Destination Stop Markers ───
    visibleStops.forEach((stop, index) => {
      const rawLat = stop.destination?.latitude;
      const rawLng = stop.destination?.longitude;
      if (rawLat === undefined || rawLat === null || rawLng === undefined || rawLng === null) return;

      const lat = Number(rawLat);
      const lng = Number(rawLng);
      if (isNaN(lat) || isNaN(lng)) return;

      const pos: [number, number] = [lat, lng];
      latLngs.push(pos);

      const isStart = index === 0;
      const isSelected = stop.id === selectedStopId;
      const orderNum = String(stop.order || index + 1).padStart(2, "0");
      const placeName = (stop.destination?.name || stop.destination?.city || stop.city_name || "STOP").toUpperCase();

      // Custom Neo-Brutalist Marker in Karnataka Red & Gold
      const markerHtml = `
        <div class="neo-map-pin flex flex-col items-center group cursor-pointer transition-transform duration-150 ${
          isSelected ? "scale-110 -translate-y-1 z-30" : "hover:scale-105 z-10"
        }">
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-xl border-[3px] border-[#171313] ${
            isStart
              ? "bg-[#B91C1C] text-white"
              : isSelected
              ? "bg-[#E51919] text-white"
              : "bg-[#FFF4E6] text-[#171313]"
          } shadow-[3px_3px_0px_#171313] font-display font-extrabold text-xs select-none">
            <span class="px-1.5 py-0.2 ${
              isStart || isSelected ? "bg-[#171313] text-[#FFF4E6]" : "bg-[#E51919] text-white"
            } rounded text-[10px]">${orderNum}</span>
            <span class="truncate max-w-[130px]">${placeName}</span>
          </div>
          <div class="w-3 h-3 bg-[#171313] border-2 border-white rotate-45 -mt-1.5 shadow-[1px_1px_0px_#171313]"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: "custom-neo-div-icon",
        html: markerHtml,
        iconSize: [140, 44],
        iconAnchor: [70, 44],
      });

      const marker = L.marker(pos, { icon: customIcon }).addTo(map);

      marker.on("click", () => {
        setActivePopupInfo({ type: "stop", data: stop });
        if (onSelectStop) onSelectStop(stop);
      });

      markersRef.current.push(marker);
    });

    // ─── 2. Render Activity Markers ───
    const visibleActivities = allActivitiesList.filter((act) => {
      if (activeDay === "all") return true;
      if ((act as ItineraryActivity).date === activeDay) return true;
      return false;
    });

    visibleActivities.forEach((act) => {
      const rawLat = act.latitude;
      const rawLng = act.longitude;
      if (rawLat === undefined || rawLat === null || rawLng === undefined || rawLng === null) return;

      const lat = Number(rawLat);
      const lng = Number(rawLng);
      if (isNaN(lat) || isNaN(lng)) return;

      const pos: [number, number] = [lat, lng];
      const isSelected = act.id === selectedActivityId;

      const actHtml = `
        <div class="activity-map-pin flex items-center justify-center cursor-pointer transition-transform ${
          isSelected ? "scale-125 z-40" : "hover:scale-115 z-20"
        }">
          <div class="w-7 h-7 rounded-full bg-[#E51919] border-[2.5px] border-[#171313] shadow-[2px_2px_0px_#171313] flex items-center justify-center text-[11px] font-extrabold text-[#FFFFFF]">
            ★
          </div>
        </div>
      `;

      const actIcon = L.divIcon({
        className: "custom-activity-div-icon",
        html: actHtml,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const actMarker = L.marker(pos, { icon: actIcon }).addTo(map);

      actMarker.on("click", () => {
        setActivePopupInfo({ type: "activity", data: act });
        if (onSelectActivity) onSelectActivity(act);
      });

      markersRef.current.push(actMarker);
    });

    // ─── 3. Render Route Polyline in Primary Red #E51919 ───
    if (latLngs.length > 1) {
      shadowPolylineRef.current = L.polyline(latLngs, {
        color: "#171313",
        weight: 8,
        opacity: 0.9,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);

      polylineRef.current = L.polyline(latLngs, {
        color: "#E51919",
        weight: 5,
        opacity: 1,
        dashArray: "8, 6",
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);
    }

    // Auto-fit bounds if trip points exist, otherwise leave Karnataka framed
    if (latLngs.length === 1) {
      map.setView(latLngs[0], 11, { animate: true });
    } else if (latLngs.length > 1 && trip) {
      const bounds = L.latLngBounds(latLngs);
      map.fitBounds(bounds, {
        padding: [60, 60],
        maxZoom: 12,
        animate: true,
      });
    }
  };

  const handleFitRoute = () => {
    if (!mapInstanceRef.current) return;
    const latLngs: [number, number][] = [];
    stopsList.forEach((s) => {
      if (s.destination?.latitude && s.destination?.longitude) {
        latLngs.push([Number(s.destination.latitude), Number(s.destination.longitude)]);
      }
    });
    if (latLngs.length === 1) {
      mapInstanceRef.current.setView(latLngs[0], 11, { animate: true });
    } else if (latLngs.length > 1) {
      mapInstanceRef.current.fitBounds(latLngs, {
        padding: [60, 60],
        animate: true,
      });
    } else {
      handleFocusKarnataka();
    }
  };

  const handleFocusKarnataka = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(KARNATAKA_CENTER, KARNATAKA_DEFAULT_ZOOM, {
        duration: 1.2,
      });
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleDaySelect = (dayId: string | number | "all") => {
    setActiveDay(dayId);
    if (onDayChange) onDayChange(dayId);
  };

  // Submit Karnataka Travel Inquiry to Google Apps Script Webhook
  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || (!inquiryEmail.trim() && !inquiryPhone.trim())) return;

    setIsSubmittingInquiry(true);
    try {
      const payload = {
        action: "karnataka_tour_inquiry",
        destination: inquiryPlace,
        name: inquiryName,
        email: inquiryEmail,
        phone: inquiryPhone,
        notes: inquiryNotes,
        timestamp: new Date().toISOString(),
        source: "Pravasan Karnataka Travel Map",
      };

      // Send to Google Script Webhook
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setInquirySuccess(true);
      setTimeout(() => {
        setIsInquiryOpen(false);
        setInquirySuccess(false);
        setInquiryNotes("");
      }, 2000);
    } catch (err) {
      console.error("Failed to post inquiry to Google Script:", err);
      // Even if CORS obscures response, GAS executes
      setInquirySuccess(true);
      setTimeout(() => {
        setIsInquiryOpen(false);
        setInquirySuccess(false);
      }, 2000);
    } finally {
      setIsSubmittingInquiry(false);
    }
  };

  return (
    <div
      className={`relative w-full rounded-2xl border-[3px] border-[#171313] shadow-[5px_5px_0px_#171313] overflow-hidden bg-[#FFF4E6] ${className}`}
      style={{ height }}
    >
      {/* ─── Top Floating Day-Wise Filter Controls ─── */}
      {showControls && tripDays.length > 1 && (
        <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-1.5 p-1.5 bg-[#FFF4E6]/95 backdrop-blur-md border-[2.5px] border-[#171313] rounded-xl shadow-[3px_3px_0px_#171313] max-w-[calc(100%-180px)] overflow-x-auto scrollbar-none">
          {tripDays.map((day) => {
            const isActive = activeDay === day.id;
            return (
              <button
                key={String(day.id)}
                type="button"
                onClick={() => handleDaySelect(day.id)}
                className={`px-3 py-1 rounded-lg text-xs font-display font-extrabold uppercase select-none transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#E51919] border-2 border-[#171313] shadow-[2px_2px_0px_#171313] text-[#FFFFFF] -translate-y-0.5"
                    : "bg-white text-[#171313] hover:bg-[#FAF7F2] border border-[#171313]"
                }`}
              >
                {day.label}
              </button>
            );
          })}
        </div>
      )}

      {/* ─── Top Layer Selector (Google Maps Roadmap / Satellite / Terrain / Voyager) ─── */}
      {showControls && (
        <div className="absolute top-4 left-4 sm:left-auto sm:right-20 z-20 hidden md:flex items-center gap-1 p-1 bg-[#FFFFFF]/95 backdrop-blur-md border-[2.5px] border-[#171313] rounded-xl shadow-[3px_3px_0px_#171313]">
          <span className="text-[10px] font-display font-black uppercase px-2 text-neutral-600 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-[#E51919]" /> Map:
          </span>
          <button
            type="button"
            onClick={() => setActiveLayer("google_roadmap")}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-display font-extrabold select-none transition-all cursor-pointer ${
              activeLayer === "google_roadmap"
                ? "bg-[#E51919] text-white border border-[#171313] shadow-[1px_1px_0px_#171313]"
                : "text-neutral-700 hover:bg-[#FFF4E6]"
            }`}
          >
            Google Road
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer("google_satellite")}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-display font-extrabold select-none transition-all cursor-pointer ${
              activeLayer === "google_satellite"
                ? "bg-[#E51919] text-white border border-[#171313] shadow-[1px_1px_0px_#171313]"
                : "text-neutral-700 hover:bg-[#FFF4E6]"
            }`}
          >
            Satellite
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer("google_terrain")}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-display font-extrabold select-none transition-all cursor-pointer ${
              activeLayer === "google_terrain"
                ? "bg-[#E51919] text-white border border-[#171313] shadow-[1px_1px_0px_#171313]"
                : "text-neutral-700 hover:bg-[#FFF4E6]"
            }`}
          >
            Terrain
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer("carto_voyager")}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-display font-extrabold select-none transition-all cursor-pointer ${
              activeLayer === "carto_voyager"
                ? "bg-[#E51919] text-white border border-[#171313] shadow-[1px_1px_0px_#171313]"
                : "text-neutral-700 hover:bg-[#FFF4E6]"
            }`}
          >
            Voyager
          </button>
        </div>
      )}

      {/* ─── Top-Right Custom Neo-Brutalist Zoom, Fit & Karnataka Focus ─── */}
      {showControls && (
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <div className="flex flex-col rounded-xl border-[2.5px] border-[#171313] bg-[#FFFFFF] shadow-[3px_3px_0px_#171313] overflow-hidden">
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-2 hover:bg-[#FAF7F2] transition-colors border-b-2 border-[#171313] text-[#171313] cursor-pointer"
              title="Zoom In"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-2 hover:bg-[#FAF7F2] transition-colors text-[#171313] cursor-pointer"
              title="Zoom Out"
            >
              <Minus className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

          {/* Quick Karnataka Focus */}
          <button
            type="button"
            onClick={handleFocusKarnataka}
            className="p-2.5 rounded-xl border-[2.5px] border-[#171313] bg-[#FFFFFF] hover:bg-[#FAF7F2] transition-colors shadow-[3px_3px_0px_#171313] text-[#171313] cursor-pointer flex items-center justify-center group"
            title="Focus Karnataka Tour Circuits"
          >
            <Compass className="w-4 h-4 stroke-[2.5] text-[#E51919] group-hover:rotate-45 transition-transform" />
          </button>

          {/* Fit Full Route */}
          <button
            type="button"
            onClick={handleFitRoute}
            className="p-2.5 rounded-xl border-[2.5px] border-[#171313] bg-[#FFFFFF] hover:bg-[#FAF7F2] transition-colors shadow-[3px_3px_0px_#171313] text-[#171313] cursor-pointer flex items-center justify-center"
            title="Fit Full Route"
          >
            <Maximize2 className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      )}

      {/* ─── Leaflet Map Target Element ─── */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* ─── Interactive Neo-Brutalist Click Popup Card ─── */}
      {activePopupInfo && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-30 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="p-4 bg-[#FFFFFF] border-[3px] border-[#171313] rounded-2xl shadow-[6px_6px_0px_#171313] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-display font-extrabold text-[10px] uppercase px-2 py-0.5 rounded bg-[#E51919] text-white border border-[#171313]">
                {activePopupInfo.type === "stop" ? "Karnataka Destination" : "Curated Tour Activity"}
              </span>
              <button
                type="button"
                onClick={() => setActivePopupInfo(null)}
                className="text-xs font-extrabold hover:text-[#E51919] px-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {activePopupInfo.type === "stop" ? (
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <div className="relative w-24 h-24 rounded-xl border-2 border-[#171313] overflow-hidden flex-shrink-0 bg-neutral-100 shadow-[2px_2px_0px_#171313]">
                    <img
                      src={resolvePlaceImageUrl(
                        activePopupInfo.data.destination?.name || activePopupInfo.data.city_name,
                        undefined,
                        activePopupInfo.data.destination?.image_url,
                        undefined,
                        undefined,
                        {
                          lat: activePopupInfo.data.destination?.latitude,
                          lng: activePopupInfo.data.destination?.longitude,
                        }
                      )}
                      alt={activePopupInfo.data.destination?.name || "Place"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const lat = activePopupInfo.data.destination?.latitude;
                        const lng = activePopupInfo.data.destination?.longitude;
                        if (lat && lng) {
                          e.currentTarget.src = `https://maps.googleapis.com/maps/api/streetview?size=400x300&location=${lat},${lng}&fov=90&key=${GOOGLE_MAPS_API_KEY}`;
                        }
                      }}
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-extrabold text-base text-[#171313] leading-snug">
                        {activePopupInfo.data.destination?.name || activePopupInfo.data.city_name}
                      </h4>
                      <p className="text-xs text-neutral-600 font-medium line-clamp-2 mt-0.5">
                        {activePopupInfo.data.destination?.description || "Karnataka Tour & Travel Destination"}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-neutral-700 mt-1">
                      {activePopupInfo.data.destination?.latitude && (
                        <span className="px-1.5 py-0.5 rounded bg-[#FFF4E6] border border-[#171313] text-[10px]">
                          📍 {Number(activePopupInfo.data.destination.latitude).toFixed(3)}, {Number(activePopupInfo.data.destination.longitude).toFixed(3)}
                        </span>
                      )}
                      <span className="text-[#E51919] font-extrabold">
                        {activePopupInfo.data.destination?.region || "Karnataka"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Google Maps & Google Script Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-neutral-200">
                  <button
                    type="button"
                    onClick={() => {
                      const name = activePopupInfo.data.destination?.name || activePopupInfo.data.city_name;
                      const lat = activePopupInfo.data.destination?.latitude;
                      const lng = activePopupInfo.data.destination?.longitude;
                      const url = lat && lng
                        ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
                        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ", Karnataka")}`;
                      window.open(url, "_blank");
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 bg-[#FFF4E6] hover:bg-[#FFE8CC] border-2 border-[#171313] rounded-lg text-xs font-display font-extrabold text-[#171313] shadow-[2px_2px_0px_#171313] cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#E51919]" />
                    Directions
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const name = activePopupInfo.data.destination?.name || activePopupInfo.data.city_name;
                      setInquiryPlace(name);
                      setIsInquiryOpen(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 bg-[#E51919] hover:bg-[#C81515] text-white border-2 border-[#171313] rounded-lg text-xs font-display font-extrabold shadow-[2px_2px_0px_#171313] cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Inquire Tour
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <div className="relative w-20 h-20 rounded-xl border-2 border-[#171313] overflow-hidden flex-shrink-0 bg-neutral-100 shadow-[2px_2px_0px_#171313] flex items-center justify-center">
                    <img
                      src={resolvePlaceImageUrl(
                        activePopupInfo.data.title || activePopupInfo.data.name,
                        undefined,
                        activePopupInfo.data.image_url,
                        activePopupInfo.data.cityName,
                        activePopupInfo.data.category,
                        {
                          lat: activePopupInfo.data.latitude,
                          lng: activePopupInfo.data.longitude,
                        }
                      )}
                      alt={activePopupInfo.data.title || "Activity"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const lat = activePopupInfo.data.latitude;
                        const lng = activePopupInfo.data.longitude;
                        if (lat && lng) {
                          e.currentTarget.src = `https://maps.googleapis.com/maps/api/streetview?size=400x300&location=${lat},${lng}&fov=90&key=${GOOGLE_MAPS_API_KEY}`;
                        }
                      }}
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-extrabold text-base text-[#171313]">
                        {activePopupInfo.data.title || activePopupInfo.data.name}
                      </h4>
                      <p className="text-xs text-neutral-600 font-medium line-clamp-1 mt-0.5">
                        {activePopupInfo.data.description || activePopupInfo.data.notes}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-neutral-700 mt-2">
                      <span className="text-[#E51919] font-extrabold">
                        ₹{activePopupInfo.data.estimated_cost}
                      </span>
                      {activePopupInfo.data.start_time && (
                        <span>• {activePopupInfo.data.start_time} - {activePopupInfo.data.end_time}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-neutral-200">
                  <button
                    type="button"
                    onClick={() => {
                      const title = activePopupInfo.data.title || activePopupInfo.data.name;
                      const lat = activePopupInfo.data.latitude;
                      const lng = activePopupInfo.data.longitude;
                      const url = lat && lng
                        ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
                        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(title + ", Karnataka")}`;
                      window.open(url, "_blank");
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 bg-[#FFF4E6] hover:bg-[#FFE8CC] border-2 border-[#171313] rounded-lg text-xs font-display font-extrabold text-[#171313] shadow-[2px_2px_0px_#171313] cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#E51919]" />
                    Google Maps
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const title = activePopupInfo.data.title || activePopupInfo.data.name;
                      setInquiryPlace(title);
                      setIsInquiryOpen(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 bg-[#E51919] hover:bg-[#C81515] text-white border-2 border-[#171313] rounded-lg text-xs font-display font-extrabold shadow-[2px_2px_0px_#171313] cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Book Activity
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Bottom-Right Map Legend in Karnataka Red & Gold ─── */}
      {showLegend && (
        <div className="hidden sm:flex absolute bottom-4 right-4 z-20 items-center gap-3 px-3 py-2 bg-[#FFF4E6]/95 backdrop-blur-xs border-[2px] border-[#171313] rounded-xl shadow-[3px_3px_0px_#171313] text-[11px] font-display font-extrabold uppercase">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#B91C1C] border border-[#171313]" />
            <span>01 Start</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FFF4E6] border border-[#171313]" />
            <span>Karnataka Circuits</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#E51919] border border-[#171313]" />
            <span>Activity ★</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-1 bg-[#E51919] border border-[#171313]" />
            <span>Route</span>
          </div>
        </div>
      )}

      {/* ─── Karnataka Tour Desk Inquiry Modal (Powered by GOOGLE_SCRIPT_URL) ─── */}
      {isInquiryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative w-full max-w-md bg-[#FFF4E6] border-[4px] border-[#171313] rounded-2xl shadow-[8px_8px_0px_#171313] p-6 animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setIsInquiryOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white border-2 border-[#171313] shadow-[2px_2px_0px_#171313] flex items-center justify-center font-bold hover:bg-[#FFE8CC] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-4">
              <span className="px-2 py-0.5 rounded bg-[#E51919] text-white font-display font-extrabold text-[10px] uppercase border border-[#171313]">
                Pravasan Karnataka Desk
              </span>
              <h3 className="font-display font-extrabold text-xl text-[#171313] mt-1.5">
                Inquire: {inquiryPlace}
              </h3>
              <p className="text-xs text-neutral-600 font-medium mt-1">
                Connected directly to our Karnataka travel operations via Google Apps Script.
              </p>
            </div>

            {inquirySuccess ? (
              <div className="p-4 bg-emerald-50 border-2 border-emerald-600 rounded-xl text-emerald-800 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <h5 className="font-display font-extrabold text-sm">Inquiry Received!</h5>
                  <p className="text-xs text-emerald-700">Our Karnataka tour coordinator will reach out shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="flex flex-col gap-3">
                <div>
                  <label className="block text-xs font-display font-extrabold uppercase text-[#171313] mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mujahid Choudhry"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border-2 border-[#171313] rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E51919]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-display font-extrabold uppercase text-[#171313] mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        placeholder="you@gmail.com"
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-white border-2 border-[#171313] rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E51919]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-display font-extrabold uppercase text-[#171313] mb-1">
                      Phone / WhatsApp
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={inquiryPhone}
                        onChange={(e) => setInquiryPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-white border-2 border-[#171313] rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E51919]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-display font-extrabold uppercase text-[#171313] mb-1">
                    Travel Dates / Requirements
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Number of travelers, preferred dates, safari or hotel preference..."
                    value={inquiryNotes}
                    onChange={(e) => setInquiryNotes(e.target.value)}
                    className="w-full p-2.5 bg-white border-2 border-[#171313] rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E51919]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsInquiryOpen(false)}
                    className="px-4 py-2 bg-white hover:bg-neutral-100 border-2 border-[#171313] rounded-xl text-xs font-display font-extrabold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingInquiry}
                    className="px-5 py-2 bg-[#E51919] hover:bg-[#C81515] text-white border-2 border-[#171313] rounded-xl text-xs font-display font-extrabold shadow-[2px_2px_0px_#171313] flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {isSubmittingInquiry ? "Submitting..." : "Send via Google Script"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
