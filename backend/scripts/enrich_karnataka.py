import json
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parent.parent / "app" / "seed"
dest_path = DATA_DIR / "destinations.json"
act_path = DATA_DIR / "activities.json"

with open(dest_path, "r", encoding="utf-8") as f:
    destinations = json.load(f)

with open(act_path, "r", encoding="utf-8") as f:
    activities = json.load(f)

# 1. Update existing Karnataka destinations to region "Karnataka"
k_names = {"bengaluru", "hampi", "gokarna", "coorg", "udupi"}
for d in destinations:
    if d["name"].lower() in k_names:
        d["region"] = "Karnataka"

new_karnataka_destinations = [
    {
        "name": "Mysuru",
        "country": "India",
        "region": "Karnataka",
        "cost_index": 3,
        "popularity_score": 95,
        "latitude": 12.2958,
        "longitude": 76.6394,
        "description": "The Heritage & Cultural Capital of Karnataka, celebrated for the illuminated Mysore Palace, Chamundi Hills, Devaraja Market, and silk weaving."
    },
    {
        "name": "Chikkamagaluru",
        "country": "India",
        "region": "Karnataka",
        "cost_index": 3,
        "popularity_score": 90,
        "latitude": 13.3161,
        "longitude": 75.7720,
        "description": "The Coffee Land of Karnataka nestled in the Western Ghats, featuring Mullayanagiri (Karnataka's highest peak), Baba Budangiri, and cascading waterfalls."
    },
    {
        "name": "Mangaluru",
        "country": "India",
        "region": "Karnataka",
        "cost_index": 3,
        "popularity_score": 86,
        "latitude": 12.9141,
        "longitude": 74.8560,
        "description": "Premier coastal port city renowned for golden Arabian Sea beaches, Mangalorean ghee roast cuisine, St. Aloysius Chapel, and ancient temples."
    },
    {
        "name": "Badami",
        "country": "India",
        "region": "Karnataka",
        "cost_index": 2,
        "popularity_score": 88,
        "latitude": 15.9187,
        "longitude": 75.6766,
        "description": "Ancient Chalukyan capital famed for 6th-century rock-cut cave temples carved into red sandstone cliffs overlooking serene Agastya Lake."
    },
    {
        "name": "Pattadakal & Aihole",
        "country": "India",
        "region": "Karnataka",
        "cost_index": 2,
        "popularity_score": 84,
        "latitude": 15.9485,
        "longitude": 75.8160,
        "description": "UNESCO World Heritage cradle of Indian temple architecture, showcasing harmonious Chalukyan synthesis of Nagara and Dravida stone craftsmanship."
    },
    {
        "name": "Belur & Halebidu",
        "country": "India",
        "region": "Karnataka",
        "cost_index": 2,
        "popularity_score": 87,
        "latitude": 13.1623,
        "longitude": 75.8604,
        "description": "UNESCO World Heritage Hoysala twin capitals featuring Chennakeshava and Hoysaleswara temples adorned with intricate soapstone friezes."
    },
    {
        "name": "Dandeli",
        "country": "India",
        "region": "Karnataka",
        "cost_index": 3,
        "popularity_score": 88,
        "latitude": 15.2415,
        "longitude": 74.6231,
        "description": "Premier eco-adventure capital of Karnataka on the roaring Kali River, famous for white-water rafting, jungle safaris, and hornbill sanctuaries."
    },
    {
        "name": "Kabini",
        "country": "India",
        "region": "Karnataka",
        "cost_index": 4,
        "popularity_score": 92,
        "latitude": 11.9261,
        "longitude": 76.2711,
        "description": "World-famous wildlife sanctuary on the Kabini River backwaters, renowned for boat safaris, black panther sightings, and wild Asian elephant herds."
    },
    {
        "name": "Bandipur National Park",
        "country": "India",
        "region": "Karnataka",
        "cost_index": 3,
        "popularity_score": 89,
        "latitude": 11.6664,
        "longitude": 76.6291,
        "description": "Historic royal hunting grounds and flagship tiger reserve under Project Tiger, featuring deciduous forests teeming with deer, leopards, and gaurs."
    },
    {
        "name": "Shivamogga & Jog Falls",
        "country": "India",
        "region": "Karnataka",
        "cost_index": 2,
        "popularity_score": 88,
        "latitude": 14.2285,
        "longitude": 74.8122,
        "description": "Gateway to Malnad encompassing majestic Jog Falls (second highest plunge falls in India), dense rainforests of Agumbe, and Sharavathi valley."
    },
    {
        "name": "Murudeshwar",
        "country": "India",
        "region": "Karnataka",
        "cost_index": 2,
        "popularity_score": 89,
        "latitude": 14.0944,
        "longitude": 74.4899,
        "description": "Stunning coastal promontory boasting the world's second tallest Shiva statue, towering 20-storey Raja Gopura, and scuba diving at Netrani Island."
    },
    {
        "name": "Chitradurga",
        "country": "India",
        "region": "Karnataka",
        "cost_index": 2,
        "popularity_score": 81,
        "latitude": 14.2251,
        "longitude": 76.3980,
        "description": "Legendary fortress city surrounded by boulder hills, celebrated for the impregnable 18th-century Kallina Kote (Fort of Seven Circles) and Onake Obavva lore."
    },
    {
        "name": "Vijayapura",
        "country": "India",
        "region": "Karnataka",
        "cost_index": 2,
        "popularity_score": 83,
        "latitude": 16.8302,
        "longitude": 75.7100,
        "description": "Historic Adil Shahi capital featuring Gol Gumbaz with its acoustic whispering gallery, ornate Ibrahim Rauza, and massive Malik-e-Maidan cannon."
    },
    {
        "name": "Bidar",
        "country": "India",
        "region": "Karnataka",
        "cost_index": 2,
        "popularity_score": 78,
        "latitude": 17.9104,
        "longitude": 77.5199,
        "description": "Northern Karnataka plateau citadel famed for Bidar Fort with triple-moat defenses, Mahmud Gawan Madrasa, and authentic Bidriware metal handicraft."
    },
    {
        "name": "Sakleshpur",
        "country": "India",
        "region": "Karnataka",
        "cost_index": 3,
        "popularity_score": 85,
        "latitude": 12.9439,
        "longitude": 75.7873,
        "description": "Serene Western Ghats hill station enveloped in cardamom and coffee estates, featuring the 8-pointed star-shaped Manjarabad Fort and Bisle Ghat vista."
    },
    {
        "name": "Belagavi",
        "country": "India",
        "region": "Karnataka",
        "cost_index": 2,
        "popularity_score": 79,
        "latitude": 15.8497,
        "longitude": 74.4977,
        "description": "Historic northern border city with Belagavi Fort, ancient Jain Kamal Basti, nearby cascading Gokak Falls, and rich military cantonment heritage."
    },
    {
        "name": "Shravanabelagola",
        "country": "India",
        "region": "Karnataka",
        "cost_index": 2,
        "popularity_score": 85,
        "latitude": 12.8595,
        "longitude": 76.4883,
        "description": "Iconic Jain sacred center featuring the world-famous 57-foot monolithic statue of Gommateshwara Lord Bahubali atop the granite Vindhyagiri hill."
    },
    {
        "name": "Dharmasthala & Kukke",
        "country": "India",
        "region": "Karnataka",
        "cost_index": 2,
        "popularity_score": 87,
        "latitude": 12.9554,
        "longitude": 75.3789,
        "description": "Sacred Western Ghats spiritual circuit renowned for Sri Manjunatha Swamy temple with mass community feeding, and serpent pilgrimage at Kukke Subramanya."
    }
]

# Insert or update new destinations
dest_by_name = {d["name"].lower(): d for d in destinations}
for nd in new_karnataka_destinations:
    key = nd["name"].lower()
    if key in dest_by_name:
        dest_by_name[key].update(nd)
    else:
        destinations.append(nd)

# 2. Add rich activities for each of the new destinations
new_activities = [
    # Mysuru
    {
        "destination": "Mysuru",
        "title": "Mysore Palace Grand Royal Tour & Illumination",
        "category": "culture",
        "estimated_cost": 200,
        "duration_minutes": 150,
        "rating": 4.9
    },
    {
        "destination": "Mysuru",
        "title": "Chamundi Hills Pilgrimage & Nandi Bull Viewpoint",
        "category": "sightseeing",
        "estimated_cost": 50,
        "duration_minutes": 120,
        "rating": 4.7
    },
    {
        "destination": "Mysuru",
        "title": "Devaraja Century-Old Flower & Spice Market Walk",
        "category": "shopping",
        "estimated_cost": 0,
        "duration_minutes": 90,
        "rating": 4.6
    },
    {
        "destination": "Mysuru",
        "title": "Authentic Mysore Pak & Mylari Dosa Food Tasting",
        "category": "food",
        "estimated_cost": 250,
        "duration_minutes": 60,
        "rating": 4.8
    },
    {
        "destination": "Mysuru",
        "title": "Brindavan Gardens Musical Fountain & Boating",
        "category": "relaxation",
        "estimated_cost": 150,
        "duration_minutes": 180,
        "rating": 4.5
    },

    # Chikkamagaluru
    {
        "destination": "Chikkamagaluru",
        "title": "Mullayanagiri Peak Sunrise Trek (Highest in Karnataka)",
        "category": "adventure",
        "estimated_cost": 300,
        "duration_minutes": 240,
        "rating": 4.9
    },
    {
        "destination": "Chikkamagaluru",
        "title": "Estate Coffee Bean Picking & Brewing Masterclass",
        "category": "culture",
        "estimated_cost": 500,
        "duration_minutes": 120,
        "rating": 4.8
    },
    {
        "destination": "Chikkamagaluru",
        "title": "Baba Budangiri Shrine & Manikyadhara Falls Excursion",
        "category": "nature",
        "estimated_cost": 200,
        "duration_minutes": 180,
        "rating": 4.6
    },
    {
        "destination": "Chikkamagaluru",
        "title": "Hebbe Falls 4x4 Jeep Safari & Forest Pool Dip",
        "category": "adventure",
        "estimated_cost": 800,
        "duration_minutes": 210,
        "rating": 4.7
    },

    # Mangaluru
    {
        "destination": "Mangaluru",
        "title": "Panambur Beach Watersports & Sunset Walk",
        "category": "adventure",
        "estimated_cost": 400,
        "duration_minutes": 120,
        "rating": 4.6
    },
    {
        "destination": "Mangaluru",
        "title": "St. Aloysius Chapel Frescoes Guided Art Tour",
        "category": "culture",
        "estimated_cost": 50,
        "duration_minutes": 60,
        "rating": 4.8
    },
    {
        "destination": "Mangaluru",
        "title": "Mangalore Ghee Roast & Kori Rotti Culinary Feast",
        "category": "food",
        "estimated_cost": 450,
        "duration_minutes": 90,
        "rating": 4.9
    },
    {
        "destination": "Mangaluru",
        "title": "Tannirbhavi Beach Ferry & Tree Park Relaxation",
        "category": "relaxation",
        "estimated_cost": 100,
        "duration_minutes": 150,
        "rating": 4.5
    },

    # Badami
    {
        "destination": "Badami",
        "title": "Badami Rock-Cut Cave Temples Exploration",
        "category": "culture",
        "estimated_cost": 250,
        "duration_minutes": 180,
        "rating": 4.9
    },
    {
        "destination": "Badami",
        "title": "Agastya Lake & Bhutanatha Temple Sunset Photography",
        "category": "sightseeing",
        "estimated_cost": 0,
        "duration_minutes": 90,
        "rating": 4.8
    },
    {
        "destination": "Badami",
        "title": "Badami Red Sandstone Cliff Bouldering & Trek",
        "category": "adventure",
        "estimated_cost": 600,
        "duration_minutes": 150,
        "rating": 4.7
    },

    # Pattadakal & Aihole
    {
        "destination": "Pattadakal & Aihole",
        "title": "Pattadakal UNESCO Monumental Complex Guided Walk",
        "category": "culture",
        "estimated_cost": 250,
        "duration_minutes": 150,
        "rating": 4.9
    },
    {
        "destination": "Pattadakal & Aihole",
        "title": "Aihole Durga Temple Horseshoe Architecture Tour",
        "category": "sightseeing",
        "estimated_cost": 100,
        "duration_minutes": 120,
        "rating": 4.7
    },

    # Belur & Halebidu
    {
        "destination": "Belur & Halebidu",
        "title": "Chennakeshava Temple Hoysala Architecture Walk",
        "category": "culture",
        "estimated_cost": 150,
        "duration_minutes": 120,
        "rating": 4.9
    },
    {
        "destination": "Belur & Halebidu",
        "title": "Hoysaleswara Temple Intricate Soapstone Friezes Tour",
        "category": "sightseeing",
        "estimated_cost": 150,
        "duration_minutes": 120,
        "rating": 4.9
    },

    # Dandeli
    {
        "destination": "Dandeli",
        "title": "Kali River Grade-3 White-Water Rafting Expedition",
        "category": "adventure",
        "estimated_cost": 1500,
        "duration_minutes": 240,
        "rating": 4.9
    },
    {
        "destination": "Dandeli",
        "title": "Syntheri Rocks Giant Monolithic Granite Cave Trek",
        "category": "nature",
        "estimated_cost": 100,
        "duration_minutes": 120,
        "rating": 4.6
    },
    {
        "destination": "Dandeli",
        "title": "Dandeli Forest Canopy Walk & Malabar Hornbill Birding",
        "category": "nature",
        "estimated_cost": 300,
        "duration_minutes": 150,
        "rating": 4.8
    },

    # Kabini
    {
        "destination": "Kabini",
        "title": "Kabini River Boat Safari for Tiger & Elephant Herds",
        "category": "adventure",
        "estimated_cost": 2200,
        "duration_minutes": 180,
        "rating": 5.0
    },
    {
        "destination": "Kabini",
        "title": "Nagarhole Jungle 4x4 Jeep Safari for Black Panther",
        "category": "nature",
        "estimated_cost": 2500,
        "duration_minutes": 210,
        "rating": 4.9
    },
    {
        "destination": "Kabini",
        "title": "Tribal Village Heritage Walk & Campfire Evening",
        "category": "culture",
        "estimated_cost": 600,
        "duration_minutes": 120,
        "rating": 4.7
    },

    # Bandipur National Park
    {
        "destination": "Bandipur National Park",
        "title": "Bandipur Morning Tiger Safari by Open Gypsy",
        "category": "nature",
        "estimated_cost": 1800,
        "duration_minutes": 180,
        "rating": 4.8
    },
    {
        "destination": "Bandipur National Park",
        "title": "Himavad Gopalaswamy Betta Misty Peak Excursion",
        "category": "sightseeing",
        "estimated_cost": 200,
        "duration_minutes": 150,
        "rating": 4.6
    },

    # Shivamogga & Jog Falls
    {
        "destination": "Shivamogga & Jog Falls",
        "title": "Jog Falls Raja & Rani Cascades Panoramic Vista",
        "category": "sightseeing",
        "estimated_cost": 50,
        "duration_minutes": 180,
        "rating": 4.9
    },
    {
        "destination": "Shivamogga & Jog Falls",
        "title": "Agumbe Rainforest Sunset Point & King Cobra Reserve",
        "category": "nature",
        "estimated_cost": 150,
        "duration_minutes": 180,
        "rating": 4.8
    },
    {
        "destination": "Shivamogga & Jog Falls",
        "title": "Sharavathi Valley Backwaters Kayaking & Island Trek",
        "category": "adventure",
        "estimated_cost": 900,
        "duration_minutes": 240,
        "rating": 4.7
    },

    # Murudeshwar
    {
        "destination": "Murudeshwar",
        "title": "Murudeshwar Giant Shiva Statue & 20-Story Gopura Lift",
        "category": "sightseeing",
        "estimated_cost": 100,
        "duration_minutes": 120,
        "rating": 4.9
    },
    {
        "destination": "Murudeshwar",
        "title": "Netrani Island Scuba Diving & Coral Reef Snorkel",
        "category": "adventure",
        "estimated_cost": 3500,
        "duration_minutes": 360,
        "rating": 4.9
    },
    {
        "destination": "Murudeshwar",
        "title": "Murudeshwar Beach Sunset Jet Skiing & Coastal Walk",
        "category": "relaxation",
        "estimated_cost": 500,
        "duration_minutes": 90,
        "rating": 4.6
    },

    # Chitradurga
    {
        "destination": "Chitradurga",
        "title": "Kallina Kote (Seven-Ring Stone Fort) Historical Hike",
        "category": "sightseeing",
        "estimated_cost": 100,
        "duration_minutes": 210,
        "rating": 4.8
    },
    {
        "destination": "Chitradurga",
        "title": "Onake Obavvana Kindi Secret Crevice Exploration",
        "category": "culture",
        "estimated_cost": 50,
        "duration_minutes": 90,
        "rating": 4.7
    },
    {
        "destination": "Chitradurga",
        "title": "Chitradurga Giant Windmill Hills Panorama",
        "category": "nature",
        "estimated_cost": 0,
        "duration_minutes": 120,
        "rating": 4.5
    },

    # Vijayapura
    {
        "destination": "Vijayapura",
        "title": "Gol Gumbaz Whispering Gallery Acoustic Experience",
        "category": "sightseeing",
        "estimated_cost": 100,
        "duration_minutes": 150,
        "rating": 4.9
    },
    {
        "destination": "Vijayapura",
        "title": "Ibrahim Rauza 'Black Taj Mahal' Persian Art Walk",
        "category": "culture",
        "estimated_cost": 100,
        "duration_minutes": 120,
        "rating": 4.8
    },
    {
        "destination": "Vijayapura",
        "title": "Malik-e-Maidan Monolithic Bronze Cannon Inspection",
        "category": "culture",
        "estimated_cost": 30,
        "duration_minutes": 45,
        "rating": 4.4
    },

    # Bidar
    {
        "destination": "Bidar",
        "title": "Bidar Fort Triple-Moat Citadel & Rangeen Mahal Tour",
        "category": "sightseeing",
        "estimated_cost": 100,
        "duration_minutes": 180,
        "rating": 4.7
    },
    {
        "destination": "Bidar",
        "title": "Traditional Bidriware Silver Inlay Metal Workshop",
        "category": "shopping",
        "estimated_cost": 300,
        "duration_minutes": 90,
        "rating": 4.8
    },
    {
        "destination": "Bidar",
        "title": "Mahmud Gawan 15th-Century Madrasa Historical Walk",
        "category": "culture",
        "estimated_cost": 50,
        "duration_minutes": 60,
        "rating": 4.6
    },

    # Sakleshpur
    {
        "destination": "Sakleshpur",
        "title": "Manjarabad 8-Point Star Fort Tipu Sultan Trail",
        "category": "sightseeing",
        "estimated_cost": 50,
        "duration_minutes": 120,
        "rating": 4.8
    },
    {
        "destination": "Sakleshpur",
        "title": "Bisle Ghat Panoramic Western Ghats Viewpoint",
        "category": "nature",
        "estimated_cost": 100,
        "duration_minutes": 150,
        "rating": 4.9
    },
    {
        "destination": "Sakleshpur",
        "title": "Green Route Railway Track & Waterfall Trek",
        "category": "adventure",
        "estimated_cost": 400,
        "duration_minutes": 240,
        "rating": 4.7
    },

    # Belagavi
    {
        "destination": "Belagavi",
        "title": "Belgaum Fort & Kamal Basti Intricate Lotus Pillars",
        "category": "culture",
        "estimated_cost": 50,
        "duration_minutes": 120,
        "rating": 4.6
    },
    {
        "destination": "Belagavi",
        "title": "Gokak Falls Horseshoe Cascade & Suspension Bridge",
        "category": "sightseeing",
        "estimated_cost": 100,
        "duration_minutes": 180,
        "rating": 4.8
    },
    {
        "destination": "Belagavi",
        "title": "Famous Belagavi Kunda & Halbai Sweet Tasting",
        "category": "food",
        "estimated_cost": 200,
        "duration_minutes": 45,
        "rating": 4.7
    },

    # Shravanabelagola
    {
        "destination": "Shravanabelagola",
        "title": "Vindhyagiri 600-Step Climb to 57ft Bahubali Monolith",
        "category": "culture",
        "estimated_cost": 0,
        "duration_minutes": 180,
        "rating": 4.9
    },
    {
        "destination": "Shravanabelagola",
        "title": "Chandragiri Hill Ancient Inscriptions & Basadis Tour",
        "category": "sightseeing",
        "estimated_cost": 0,
        "duration_minutes": 120,
        "rating": 4.7
    },

    # Dharmasthala & Kukke
    {
        "destination": "Dharmasthala & Kukke",
        "title": "Sri Manjunatha Swamy Temple Darshan & Annadana",
        "category": "culture",
        "estimated_cost": 0,
        "duration_minutes": 150,
        "rating": 4.9
    },
    {
        "destination": "Dharmasthala & Kukke",
        "title": "Kukke Subramanya Western Ghats Foothills Pilgrimage",
        "category": "sightseeing",
        "estimated_cost": 50,
        "duration_minutes": 150,
        "rating": 4.8
    },
    {
        "destination": "Dharmasthala & Kukke",
        "title": "Manjusha Vintage Car & Ancient Artifacts Museum",
        "category": "culture",
        "estimated_cost": 100,
        "duration_minutes": 90,
        "rating": 4.6
    }
]

# Upsert activities by (destination, title)
act_keys = {(a["destination"].lower(), a["title"].lower()): a for a in activities}
added_count = 0
for na in new_activities:
    k = (na["destination"].lower(), na["title"].lower())
    if k not in act_keys:
        activities.append(na)
        act_keys[k] = na
        added_count += 1

with open(dest_path, "w", encoding="utf-8") as f:
    json.dump(destinations, f, indent=2, ensure_ascii=False)

with open(act_path, "w", encoding="utf-8") as f:
    json.dump(activities, f, indent=2, ensure_ascii=False)

print(f"Successfully enriched destinations: Total {len(destinations)}")
print(f"Successfully enriched activities: Total {len(activities)} (added {added_count})")

