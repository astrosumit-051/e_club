# US Entrepreneurship Resources Database Schema

## Target Structure: JSON with 51 entries (50 states + DC)

Each state entry should contain:

### Required Fields:
- **state_name**: Full state name
- **state_code**: Two-letter abbreviation
- **funding_programs**: Array of funding opportunities
- **accelerators_incubators**: Array of accelerator/incubator programs
- **communities_networking**: Array of local entrepreneurship communities and events
- **legal_business_resources**: Array of state business registration and legal resources
- **university_programs**: Array of university-based entrepreneurship programs
- **startup_ecosystems**: Array of notable startup ecosystems and success stories

### Sub-object Fields (for each resource):
- **name**: Resource/program name
- **description**: Brief description of the resource
- **website_url**: Official website URL
- **contact_info**: Contact details (email, phone, address)
- **eligibility_criteria**: Who can apply/participate
- **application_deadlines**: Relevant deadlines (if applicable)
- **funding_amount**: Amount of funding available (for funding programs)
- **program_duration**: Length of program (for accelerators/incubators)
- **location**: Specific city/region within state

## States to Include:
Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware, Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina, North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina, South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia, Wisconsin, Wyoming, Washington DC
