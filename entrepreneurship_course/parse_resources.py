#!/usr/bin/env python3
import json
import re
import os
from pathlib import Path

# State abbreviation mapping
STATE_MAPPING = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
    'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
    'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
    'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
    'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
    'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
    'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
    'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
    'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
    'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY'
}

# City to state mapping for major cities
CITY_STATE_MAPPING = {
    'Mountain View': 'CA', 'San Francisco': 'CA', 'Palo Alto': 'CA', 'Los Angeles': 'CA', 'San Diego': 'CA',
    'Boulder': 'CO', 'Denver': 'CO', 'Boston': 'MA', 'Cambridge': 'MA', 'New York': 'NY', 'NYC': 'NY',
    'Austin': 'TX', 'Houston': 'TX', 'Dallas': 'TX', 'Seattle': 'WA', 'Chicago': 'IL', 'Atlanta': 'GA',
    'Miami': 'FL', 'Orlando': 'FL', 'Tampa': 'FL', 'Phoenix': 'AZ', 'Las Vegas': 'NV', 'Portland': 'OR',
    'Nashville': 'TN', 'Memphis': 'TN', 'Detroit': 'MI', 'Minneapolis': 'MN', 'Philadelphia': 'PA',
    'Pittsburgh': 'PA', 'Cleveland': 'OH', 'Columbus': 'OH', 'Cincinnati': 'OH', 'Indianapolis': 'IN',
    'Milwaukee': 'WI', 'Kansas City': 'MO', 'St. Louis': 'MO', 'Oklahoma City': 'OK', 'Tulsa': 'OK',
    'Salt Lake City': 'UT', 'Richmond': 'VA', 'Norfolk': 'VA', 'Charlotte': 'NC', 'Raleigh': 'NC',
    'Charleston': 'SC', 'New Orleans': 'LA', 'Baton Rouge': 'LA', 'Little Rock': 'AR', 'Birmingham': 'AL',
    'Louisville': 'KY', 'Lexington': 'KY', 'Jackson': 'MS', 'Omaha': 'NE', 'Des Moines': 'IA',
    'Wichita': 'KS', 'Topeka': 'KS', 'Albuquerque': 'NM', 'Tucson': 'AZ', 'Fresno': 'CA',
    'Sacramento': 'CA', 'San Jose': 'CA', 'Oakland': 'CA', 'Long Beach': 'CA', 'Mesa': 'AZ',
    'Virginia Beach': 'VA', 'Omaha': 'NE', 'Colorado Springs': 'CO', 'Raleigh': 'NC', 'Miami': 'FL',
    'Oakland': 'CA', 'Minneapolis': 'MN', 'Tulsa': 'OK', 'Cleveland': 'OH', 'Wichita': 'KS',
    'Arlington': 'TX', 'New Orleans': 'LA', 'Bakersfield': 'CA', 'Tampa': 'FL', 'Honolulu': 'HI',
    'Anaheim': 'CA', 'Aurora': 'CO', 'Santa Ana': 'CA', 'St. Louis': 'MO', 'Riverside': 'CA',
    'Corpus Christi': 'TX', 'Lexington': 'KY', 'Pittsburgh': 'PA', 'Anchorage': 'AK', 'Stockton': 'CA',
    'Cincinnati': 'OH', 'St. Paul': 'MN', 'Toledo': 'OH', 'Newark': 'NJ', 'Greensboro': 'NC',
    'Plano': 'TX', 'Henderson': 'NV', 'Lincoln': 'NE', 'Buffalo': 'NY', 'Jersey City': 'NJ',
    'Chula Vista': 'CA', 'Fort Wayne': 'IN', 'Orlando': 'FL', 'St. Petersburg': 'FL', 'Chandler': 'AZ',
    'Laredo': 'TX', 'Norfolk': 'VA', 'Durham': 'NC', 'Madison': 'WI', 'Lubbock': 'TX',
    'Irvine': 'CA', 'Winston-Salem': 'NC', 'Glendale': 'AZ', 'Garland': 'TX', 'Hialeah': 'FL',
    'Reno': 'NV', 'Chesapeake': 'VA', 'Gilbert': 'AZ', 'Baton Rouge': 'LA', 'Irving': 'TX',
    'Scottsdale': 'AZ', 'North Las Vegas': 'NV', 'Fremont': 'CA', 'Boise': 'ID', 'Richmond': 'VA',
    'San Bernardino': 'CA', 'Birmingham': 'AL', 'Spokane': 'WA', 'Rochester': 'NY', 'Des Moines': 'IA',
    'Modesto': 'CA', 'Fayetteville': 'NC', 'Tacoma': 'WA', 'Oxnard': 'CA', 'Fontana': 'CA',
    'Columbus': 'GA', 'Montgomery': 'AL', 'Moreno Valley': 'CA', 'Shreveport': 'LA', 'Aurora': 'IL',
    'Yonkers': 'NY', 'Akron': 'OH', 'Huntington Beach': 'CA', 'Little Rock': 'AR', 'Augusta': 'GA',
    'Amarillo': 'TX', 'Glendale': 'CA', 'Mobile': 'AL', 'Grand Rapids': 'MI', 'Salt Lake City': 'UT',
    'Tallahassee': 'FL', 'Huntsville': 'AL', 'Grand Prairie': 'TX', 'Knoxville': 'TN', 'Worcester': 'MA',
    'Newport News': 'VA', 'Brownsville': 'TX', 'Overland Park': 'KS', 'Santa Clarita': 'CA', 'Providence': 'RI',
    'Garden Grove': 'CA', 'Chattanooga': 'TN', 'Oceanside': 'CA', 'Jackson': 'MS', 'Fort Lauderdale': 'FL',
    'Santa Rosa': 'CA', 'Rancho Cucamonga': 'CA', 'Port St. Lucie': 'FL', 'Tempe': 'AZ', 'Ontario': 'CA',
    'Vancouver': 'WA', 'Cape Coral': 'FL', 'Sioux Falls': 'SD', 'Springfield': 'MO', 'Peoria': 'AZ',
    'Pembroke Pines': 'FL', 'Elk Grove': 'CA', 'Salem': 'OR', 'Lancaster': 'CA', 'Corona': 'CA',
    'Eugene': 'OR', 'Palmdale': 'CA', 'Salinas': 'CA', 'Springfield': 'MA', 'Pasadena': 'CA',
    'Fort Collins': 'CO', 'Hayward': 'CA', 'Pomona': 'CA', 'Cary': 'NC', 'Rockford': 'IL',
    'Alexandria': 'VA', 'Escondido': 'CA', 'McKinney': 'TX', 'Kansas City': 'KS', 'Joliet': 'IL',
    'Sunnyvale': 'CA', 'Torrance': 'CA', 'Bridgeport': 'CT', 'Lakewood': 'CO', 'Hollywood': 'FL',
    'Paterson': 'NJ', 'Naperville': 'IL', 'Syracuse': 'NY', 'Mesquite': 'TX', 'Dayton': 'OH',
    'Savannah': 'GA', 'Clarksville': 'TN', 'Orange': 'CA', 'Pasadena': 'TX', 'Fullerton': 'CA',
    'Killeen': 'TX', 'Frisco': 'TX', 'Hampton': 'VA', 'McAllen': 'TX', 'Warren': 'MI',
    'Bellevue': 'WA', 'West Valley City': 'UT', 'Columbia': 'MO', 'Olathe': 'KS', 'Sterling Heights': 'MI',
    'New Haven': 'CT', 'Miramar': 'FL', 'Waco': 'TX', 'Thousand Oaks': 'CA', 'Cedar Rapids': 'IA',
    'Charleston': 'WV', 'Visalia': 'CA', 'Topeka': 'KS', 'Elizabeth': 'NJ', 'Gainesville': 'FL',
    'Thornton': 'CO', 'Roseville': 'CA', 'Carrollton': 'TX', 'Coral Springs': 'FL', 'Stamford': 'CT',
    'Simi Valley': 'CA', 'Concord': 'CA', 'Hartford': 'CT', 'Kent': 'WA', 'Lafayette': 'LA',
    'Midland': 'TX', 'Surprise': 'AZ', 'Denton': 'TX', 'Victorville': 'CA', 'Evansville': 'IN',
    'Santa Clara': 'CA', 'Abilene': 'TX', 'Athens': 'GA', 'Vallejo': 'CA', 'Allentown': 'PA',
    'Norman': 'OK', 'Beaumont': 'TX', 'Independence': 'MO', 'Murfreesboro': 'TN', 'Ann Arbor': 'MI',
    'Fargo': 'ND', 'Wilmington': 'NC', 'Golden Valley': 'MN', 'Columbia': 'SC', 'Carmel': 'IN',
    'Arvada': 'CO', 'Berkeley': 'CA', 'Westminster': 'CO', 'Provo': 'UT', 'Round Rock': 'TX',
    'Pueblo': 'CO', 'Fairfield': 'CA', 'Orem': 'UT', 'Lowell': 'MA', 'West Jordan': 'UT',
    'Inglewood': 'CA', 'Centennial': 'CO', 'Elgin': 'IL', 'Charleston': 'SC', 'Clearwater': 'FL',
    'Gresham': 'OR', 'West Palm Beach': 'FL', 'Richmond': 'CA', 'Murrieta': 'CA', 'Burbank': 'CA',
    'Ada': 'OK', 'Palm Bay': 'FL', 'Richardson': 'TX', 'Pompano Beach': 'FL', 'North Charleston': 'SC',
    'Everett': 'WA', 'Wichita Falls': 'TX', 'Green Bay': 'WI', 'Machine': 'GA', 'Antioch': 'CA',
    'Lansing': 'MI', 'High Point': 'NC', 'Peoria': 'IL', 'Norwalk': 'CA', 'Camden': 'NJ',
    'Daly City': 'CA', 'Brockton': 'MA', 'Rialto': 'CA', 'Richmond': 'VA', 'Davenport': 'IA',
    'Tyler': 'TX', 'Odessa': 'TX', 'Lakeland': 'FL', 'Medford': 'OR', 'Renton': 'WA',
    'Las Cruces': 'NM', 'Temecula': 'CA', 'Santa Maria': 'CA', 'Princeton': 'NJ'
}

def load_json_file(filepath):
    """Load JSON file and return data"""
    with open(filepath, 'r') as f:
        return json.load(f)

def save_json_file(filepath, data):
    """Save data to JSON file"""
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)

def extract_state_from_text(text):
    """Extract state abbreviation from text"""
    # First try to find state names
    for state_name, state_abbr in STATE_MAPPING.items():
        if state_name.lower() in text.lower():
            return state_abbr
    
    # Then try city names
    for city_name, state_abbr in CITY_STATE_MAPPING.items():
        if city_name.lower() in text.lower():
            return state_abbr
    
    # Try to find state abbreviations directly
    state_abbr_pattern = r'\b([A-Z]{2})\b'
    matches = re.findall(state_abbr_pattern, text)
    for match in matches:
        if match in STATE_MAPPING.values():
            return match
    
    return None

def parse_accelerator_data(content):
    """Parse accelerator/incubator data from content"""
    resources = []
    
    # Look for structured data patterns
    lines = content.split('\n')
    current_resource = {}
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Look for accelerator names (usually in headers or bold)
        if any(keyword in line.lower() for keyword in ['accelerator', 'incubator', 'y combinator', 'techstars', '500 startups']):
            if current_resource and 'name' in current_resource:
                resources.append(current_resource)
                current_resource = {}
            
            # Extract name
            name_match = re.search(r'([A-Za-z0-9\s&]+(?:accelerator|incubator|ventures|capital|labs))', line, re.IGNORECASE)
            if name_match:
                current_resource['name'] = name_match.group(1).strip()
        
        # Look for location information
        if 'location' in line.lower() or 'based' in line.lower():
            state = extract_state_from_text(line)
            if state:
                current_resource['state'] = state
        
        # Look for website URLs
        url_match = re.search(r'https?://[^\s]+', line)
        if url_match:
            current_resource['website'] = url_match.group(0)
        
        # Look for funding information
        if any(keyword in line.lower() for keyword in ['funding', 'investment', 'equity', '$']):
            current_resource['funding_info'] = line
    
    if current_resource and 'name' in current_resource:
        resources.append(current_resource)
    
    return resources

def parse_sba_data(content):
    """Parse SBA resource data"""
    resources = []
    
    # Look for SBDC, SCORE, WBC, VBOC mentions
    lines = content.split('\n')
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
        
        resource = {}
        
        # Check for resource types
        if 'sbdc' in line.lower() or 'small business development center' in line.lower():
            resource['type'] = 'SBDC'
            resource['category'] = 'educational_programs'
        elif 'score' in line.lower():
            resource['type'] = 'SCORE'
            resource['category'] = 'educational_programs'
        elif 'women\'s business center' in line.lower() or 'wbc' in line.lower():
            resource['type'] = 'Women\'s Business Center'
            resource['category'] = 'educational_programs'
        elif 'veterans business outreach center' in line.lower() or 'vboc' in line.lower():
            resource['type'] = 'Veterans Business Outreach Center'
            resource['category'] = 'educational_programs'
        
        if resource:
            state = extract_state_from_text(line)
            if state:
                resource['state'] = state
                resource['name'] = line
                resources.append(resource)
    
    return resources

def main():
    # Load existing JSON structure
    json_file = '/home/ubuntu/entrepreneurship_course/us_resources_by_state.json'
    data = load_json_file(json_file)
    
    # Parse research files
    research_dir = '/home/ubuntu/.research_files'
    
    # Parse accelerator data
    try:
        with open(f'{research_dir}/startup_accelerators_2024.md', 'r') as f:
            accelerator_content = f.read()
        accelerator_resources = parse_accelerator_data(accelerator_content)
        
        for resource in accelerator_resources:
            if 'state' in resource:
                state = resource['state']
                resource_entry = {
                    'name': resource.get('name', 'Unknown'),
                    'description': f"Startup accelerator/incubator",
                    'website': resource.get('website', None),
                    'type': 'Accelerator/Incubator',
                    'eligibility_criteria': None,
                    'application_deadline': None,
                    'funding_amount': resource.get('funding_info', None),
                    'contact_info': None
                }
                data[state]['accelerators'].append(resource_entry)
    except Exception as e:
        print(f"Error parsing accelerator data: {e}")
    
    # Parse Failory accelerator data
    try:
        with open(f'{research_dir}/us_accelerators_incubators.md', 'r') as f:
            failory_content = f.read()
        failory_resources = parse_accelerator_data(failory_content)
        
        for resource in failory_resources:
            if 'state' in resource:
                state = resource['state']
                resource_entry = {
                    'name': resource.get('name', 'Unknown'),
                    'description': f"Startup accelerator/incubator",
                    'website': resource.get('website', None),
                    'type': 'Accelerator/Incubator',
                    'eligibility_criteria': None,
                    'application_deadline': None,
                    'funding_amount': resource.get('funding_info', None),
                    'contact_info': None
                }
                data[state]['accelerators'].append(resource_entry)
    except Exception as e:
        print(f"Error parsing Failory data: {e}")
    
    # Parse SBA data
    try:
        with open(f'{research_dir}/sba_local_assistance.md', 'r') as f:
            sba_content = f.read()
        sba_resources = parse_sba_data(sba_content)
        
        for resource in sba_resources:
            if 'state' in resource:
                state = resource['state']
                category = resource.get('category', 'educational_programs')
                resource_entry = {
                    'name': resource.get('name', 'Unknown'),
                    'description': f"SBA {resource.get('type', 'Resource')}",
                    'website': 'https://www.sba.gov/local-assistance/find',
                    'type': resource.get('type', 'SBA Resource'),
                    'eligibility_criteria': 'Small businesses and entrepreneurs',
                    'application_deadline': None,
                    'funding_amount': None,
                    'contact_info': 'Contact via SBA local assistance finder'
                }
                data[state][category].append(resource_entry)
    except Exception as e:
        print(f"Error parsing SBA data: {e}")
    
    # Add some well-known resources for major states
    well_known_resources = {
        'CA': {
            'accelerators': [
                {
                    'name': 'Y Combinator',
                    'description': 'World-renowned startup accelerator program',
                    'website': 'https://www.ycombinator.com',
                    'type': 'Accelerator',
                    'eligibility_criteria': 'Early-stage startups with innovative ideas',
                    'application_deadline': 'Twice yearly (check website)',
                    'funding_amount': '$500,000 for 7% equity',
                    'contact_info': 'Apply through website'
                },
                {
                    'name': 'Techstars',
                    'description': 'Global startup accelerator network',
                    'website': 'https://www.techstars.com',
                    'type': 'Accelerator',
                    'eligibility_criteria': 'Early-stage technology startups',
                    'application_deadline': 'Multiple programs throughout year',
                    'funding_amount': '$120,000 for 6% equity',
                    'contact_info': 'Apply through website'
                }
            ],
            'funding': [
                {
                    'name': 'California Small Business Loan Guarantee Program',
                    'description': 'State loan guarantee program for small businesses',
                    'website': 'https://www.ibank.ca.gov',
                    'type': 'Loan Guarantee',
                    'eligibility_criteria': 'California small businesses',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Up to $2.5 million',
                    'contact_info': 'California Infrastructure and Economic Development Bank'
                }
            ]
        },
        'NY': {
            'accelerators': [
                {
                    'name': 'Techstars NYC',
                    'description': 'New York City branch of Techstars accelerator',
                    'website': 'https://www.techstars.com/accelerators/nyc',
                    'type': 'Accelerator',
                    'eligibility_criteria': 'Early-stage technology startups',
                    'application_deadline': 'Check website for current cohort',
                    'funding_amount': '$120,000 for 6% equity',
                    'contact_info': 'Apply through Techstars website'
                }
            ],
            'funding': [
                {
                    'name': 'New York State Innovation Venture Capital Fund',
                    'description': 'State venture capital fund for innovative startups',
                    'website': 'https://esd.ny.gov',
                    'type': 'Venture Capital',
                    'eligibility_criteria': 'New York-based innovative startups',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Varies',
                    'contact_info': 'Empire State Development'
                }
            ]
        },
        'TX': {
            'accelerators': [
                {
                    'name': 'Techstars Austin',
                    'description': 'Austin branch of Techstars accelerator',
                    'website': 'https://www.techstars.com/accelerators/austin',
                    'type': 'Accelerator',
                    'eligibility_criteria': 'Early-stage technology startups',
                    'application_deadline': 'Check website for current cohort',
                    'funding_amount': '$120,000 for 6% equity',
                    'contact_info': 'Apply through Techstars website'
                }
            ]
        },
        'MA': {
            'accelerators': [
                {
                    'name': 'MassChallenge',
                    'description': 'Zero-equity startup accelerator',
                    'website': 'https://masschallenge.org',
                    'type': 'Accelerator',
                    'eligibility_criteria': 'High-impact startups',
                    'application_deadline': 'Multiple deadlines per year',
                    'funding_amount': 'Up to $100,000 (no equity taken)',
                    'contact_info': 'Apply through website'
                }
            ]
        }
    }
    
    # Add well-known resources
    for state, categories in well_known_resources.items():
        for category, resources in categories.items():
            for resource in resources:
                # Check if resource already exists
                existing = False
                for existing_resource in data[state][category]:
                    if existing_resource['name'] == resource['name']:
                        existing = True
                        break
                if not existing:
                    data[state][category].append(resource)
    
    # Save updated JSON
    save_json_file(json_file, data)
    print(f"Updated JSON file with parsed resources")
    
    # Print summary
    total_resources = 0
    for state, categories in data.items():
        state_total = sum(len(resources) for resources in categories.values())
        if state_total > 0:
            print(f"{state}: {state_total} resources")
            total_resources += state_total
    
    print(f"Total resources added: {total_resources}")

if __name__ == "__main__":
    main()
