#!/usr/bin/env python3
import json

def load_json_file(filepath):
    """Load JSON file and return data"""
    with open(filepath, 'r') as f:
        return json.load(f)

def save_json_file(filepath, data):
    """Save data to JSON file"""
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)

def add_comprehensive_resources():
    """Add comprehensive resources for remaining states"""
    
    json_file = '/home/ubuntu/entrepreneurship_course/us_resources_by_state.json'
    data = load_json_file(json_file)
    
    # Additional comprehensive resources
    additional_resources = {
        'NV': {
            'startup_communities': [
                {
                    'name': 'StartUpNV',
                    'description': 'Nevada\'s premier startup organization facilitating over $77M in funding',
                    'website': 'https://startupnv.org',
                    'type': 'Startup Organization',
                    'eligibility_criteria': 'Nevada startups and entrepreneurs',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Facilitates funding connections',
                    'contact_info': 'StartUpNV'
                },
                {
                    'name': 'StartUp Vegas',
                    'description': 'Las Vegas startup community focusing on hospitality and gaming tech',
                    'website': 'https://startupvegas.com',
                    'type': 'Local Startup Community',
                    'eligibility_criteria': 'Las Vegas area entrepreneurs',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Community support',
                    'contact_info': 'StartUp Vegas'
                }
            ],
            'funding': [
                {
                    'name': 'AngelNV',
                    'description': 'Nevada angel investor network',
                    'website': 'https://angelnv.org',
                    'type': 'Angel Network',
                    'eligibility_criteria': 'Nevada startups seeking angel investment',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Varies by investor',
                    'contact_info': 'AngelNV'
                },
                {
                    'name': 'FundNV',
                    'description': 'Nevada venture capital fund',
                    'website': 'https://fundnv.com',
                    'type': 'Venture Capital',
                    'eligibility_criteria': 'Nevada-based startups',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Varies',
                    'contact_info': 'FundNV'
                }
            ]
        },
        'NH': {
            'incubators': [
                {
                    'name': 'Hannah Grimes Center',
                    'description': 'Business incubator and entrepreneurship center',
                    'website': 'https://hannahgrimes.com',
                    'type': 'Business Incubator',
                    'eligibility_criteria': 'New Hampshire entrepreneurs',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Incubation services',
                    'contact_info': 'Hannah Grimes Center'
                },
                {
                    'name': 'Dartmouth Regional Technology Center',
                    'description': 'Technology incubator and co-working space',
                    'website': 'https://dartmouthrtc.com',
                    'type': 'Technology Incubator',
                    'eligibility_criteria': 'Technology startups',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Space and services',
                    'contact_info': 'Dartmouth Regional Technology Center'
                }
            ],
            'startup_communities': [
                {
                    'name': 'NH Tech Alliance',
                    'description': 'Technology community providing mentorship and networking',
                    'website': 'https://nhtechalliance.org',
                    'type': 'Tech Community',
                    'eligibility_criteria': 'New Hampshire tech entrepreneurs',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Membership-based services',
                    'contact_info': 'NH Tech Alliance'
                }
            ]
        },
        'NC': {
            'startup_communities': [
                {
                    'name': 'Research Triangle Park',
                    'description': 'One of the largest research parks in the world',
                    'website': 'https://rtp.org',
                    'type': 'Research Park',
                    'eligibility_criteria': 'Technology and research companies',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Space and services',
                    'contact_info': 'Research Triangle Park'
                },
                {
                    'name': 'Council for Entrepreneurial Development',
                    'description': 'North Carolina\'s largest entrepreneurship organization',
                    'website': 'https://cednc.org',
                    'type': 'Entrepreneurship Organization',
                    'eligibility_criteria': 'North Carolina entrepreneurs',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Programs and services',
                    'contact_info': 'CED'
                }
            ],
            'accelerators': [
                {
                    'name': 'American Underground',
                    'description': 'Startup campus and accelerator in Durham',
                    'website': 'https://americanunderground.com',
                    'type': 'Startup Campus',
                    'eligibility_criteria': 'Early-stage startups',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Space and programming',
                    'contact_info': 'American Underground'
                }
            ]
        },
        'OH': {
            'funding': [
                {
                    'name': 'Ohio Third Frontier',
                    'description': 'State technology and innovation initiative',
                    'website': 'https://development.ohio.gov/business/third-frontier',
                    'type': 'State Innovation Program',
                    'eligibility_criteria': 'Ohio technology companies',
                    'application_deadline': 'Various programs',
                    'funding_amount': 'Varies by program',
                    'contact_info': 'Ohio Development Services Agency'
                },
                {
                    'name': 'JumpStart',
                    'description': 'Cleveland-based venture development organization',
                    'website': 'https://jumpstartinc.org',
                    'type': 'Venture Development',
                    'eligibility_criteria': 'Ohio startups',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Investment and services',
                    'contact_info': 'JumpStart Inc.'
                }
            ],
            'accelerators': [
                {
                    'name': 'Techstars Columbus',
                    'description': 'Columbus branch of Techstars accelerator',
                    'website': 'https://www.techstars.com/accelerators/columbus',
                    'type': 'Accelerator',
                    'eligibility_criteria': 'Early-stage startups',
                    'application_deadline': 'Annual cohorts',
                    'funding_amount': '$120,000 for 6% equity',
                    'contact_info': 'Techstars Columbus'
                }
            ]
        },
        'OR': {
            'startup_communities': [
                {
                    'name': 'Portland Startup Community',
                    'description': 'Vibrant startup ecosystem in Portland',
                    'website': 'https://pdxstartups.com',
                    'type': 'Startup Community',
                    'eligibility_criteria': 'Portland area entrepreneurs',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Community support',
                    'contact_info': 'Portland Startup Community'
                }
            ],
            'accelerators': [
                {
                    'name': 'Oregon Story Board',
                    'description': 'Portland-based startup accelerator',
                    'website': 'https://oregonstoryboard.org',
                    'type': 'Accelerator',
                    'eligibility_criteria': 'Oregon startups',
                    'application_deadline': 'Cohort-based',
                    'funding_amount': 'Investment and mentorship',
                    'contact_info': 'Oregon Story Board'
                }
            ]
        },
        'WA': {
            'accelerators': [
                {
                    'name': 'Techstars Seattle',
                    'description': 'Seattle branch of Techstars accelerator',
                    'website': 'https://www.techstars.com/accelerators/seattle',
                    'type': 'Accelerator',
                    'eligibility_criteria': 'Early-stage startups',
                    'application_deadline': 'Annual cohorts',
                    'funding_amount': '$120,000 for 6% equity',
                    'contact_info': 'Techstars Seattle'
                }
            ],
            'startup_communities': [
                {
                    'name': 'Seattle Angel Conference',
                    'description': 'Angel investor network in Seattle',
                    'website': 'https://seattleangelconference.com',
                    'type': 'Angel Network',
                    'eligibility_criteria': 'Pacific Northwest startups',
                    'application_deadline': 'Quarterly events',
                    'funding_amount': 'Angel investment',
                    'contact_info': 'Seattle Angel Conference'
                }
            ]
        },
        'UT': {
            'startup_communities': [
                {
                    'name': 'Silicon Slopes',
                    'description': 'Utah\'s premier tech and startup community',
                    'website': 'https://siliconslopes.com',
                    'type': 'Tech Community',
                    'eligibility_criteria': 'Utah tech entrepreneurs',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Community programs',
                    'contact_info': 'Silicon Slopes'
                }
            ],
            'accelerators': [
                {
                    'name': 'Techstars Utah',
                    'description': 'Utah branch of Techstars accelerator',
                    'website': 'https://www.techstars.com/accelerators/utah',
                    'type': 'Accelerator',
                    'eligibility_criteria': 'Early-stage startups',
                    'application_deadline': 'Annual cohorts',
                    'funding_amount': '$120,000 for 6% equity',
                    'contact_info': 'Techstars Utah'
                }
            ]
        },
        'FL': {
            'accelerators': [
                {
                    'name': 'Techstars Miami',
                    'description': 'Miami branch of Techstars accelerator',
                    'website': 'https://www.techstars.com/accelerators/miami',
                    'type': 'Accelerator',
                    'eligibility_criteria': 'Early-stage startups',
                    'application_deadline': 'Annual cohorts',
                    'funding_amount': '$120,000 for 6% equity',
                    'contact_info': 'Techstars Miami'
                },
                {
                    'name': 'eMerge Americas',
                    'description': 'Miami-based startup accelerator and conference',
                    'website': 'https://emergeamericas.com',
                    'type': 'Accelerator/Conference',
                    'eligibility_criteria': 'Tech startups',
                    'application_deadline': 'Annual event',
                    'funding_amount': 'Varies',
                    'contact_info': 'eMerge Americas'
                }
            ],
            'startup_communities': [
                {
                    'name': 'Refresh Miami',
                    'description': 'Miami tech and startup community',
                    'website': 'https://refreshmiami.com',
                    'type': 'Tech Community',
                    'eligibility_criteria': 'Miami tech entrepreneurs',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Community events',
                    'contact_info': 'Refresh Miami'
                }
            ]
        },
        'GA': {
            'accelerators': [
                {
                    'name': 'Techstars Atlanta',
                    'description': 'Atlanta branch of Techstars accelerator',
                    'website': 'https://www.techstars.com/accelerators/atlanta',
                    'type': 'Accelerator',
                    'eligibility_criteria': 'Early-stage startups',
                    'application_deadline': 'Annual cohorts',
                    'funding_amount': '$120,000 for 6% equity',
                    'contact_info': 'Techstars Atlanta'
                },
                {
                    'name': 'Atlanta Tech Village',
                    'description': 'Large startup community and co-working space',
                    'website': 'https://atlantatechvillage.com',
                    'type': 'Startup Community',
                    'eligibility_criteria': 'Tech startups',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Membership-based',
                    'contact_info': 'Atlanta Tech Village'
                }
            ]
        },
        'VA': {
            'startup_communities': [
                {
                    'name': 'Virginia Innovation Partnership Corporation (VIPC)',
                    'description': 'State-designated nonprofit driving innovation and entrepreneurship',
                    'website': 'https://vipc.org',
                    'type': 'State Innovation Organization',
                    'eligibility_criteria': 'Virginia entrepreneurs and startups',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Various programs',
                    'contact_info': 'VIPC'
                }
            ],
            'accelerators': [
                {
                    'name': '1776',
                    'description': 'Global startup accelerator with Virginia presence',
                    'website': 'https://1776.vc',
                    'type': 'Accelerator',
                    'eligibility_criteria': 'Startups in regulated industries',
                    'application_deadline': 'Cohort-based',
                    'funding_amount': 'Investment and services',
                    'contact_info': '1776'
                }
            ]
        }
    }
    
    # Add additional resources
    for state_abbr, categories in additional_resources.items():
        for category, resources in categories.items():
            for resource in resources:
                # Check if resource already exists
                existing = False
                for existing_resource in data[state_abbr][category]:
                    if existing_resource['name'] == resource['name']:
                        existing = True
                        break
                if not existing:
                    data[state_abbr][category].append(resource)
    
    # Save updated JSON
    save_json_file(json_file, data)
    
    # Print final summary
    total_resources = 0
    states_with_resources = 0
    for state, categories in data.items():
        state_total = sum(len(resources) for resources in categories.values())
        if state_total > 0:
            states_with_resources += 1
            total_resources += state_total
    
    print(f"Final database summary:")
    print(f"Total states with resources: {states_with_resources}/50")
    print(f"Total resources in database: {total_resources}")
    
    # Show breakdown by category
    category_totals = {}
    for state, categories in data.items():
        for category, resources in categories.items():
            if category not in category_totals:
                category_totals[category] = 0
            category_totals[category] += len(resources)
    
    print(f"\nResources by category:")
    for category, total in category_totals.items():
        print(f"  {category}: {total}")
    
    return data

if __name__ == "__main__":
    add_comprehensive_resources()
