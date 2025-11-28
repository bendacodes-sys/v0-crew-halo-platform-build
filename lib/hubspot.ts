// HubSpot API integration

export interface HubSpotContact {
  id: string
  properties: {
    company?: string | null
    createdate: string
    email?: string | null
    firstname?: string | null
    hs_object_id: string
    lastmodifieddate: string
    lastname?: string | null
    lifecyclestage: string
    phone?: string | null
  }
  createdAt: string
  updatedAt: string
  archived: boolean
  url: string
}

export interface HubSpotResponse {
  success: boolean
  total: number
  contacts: HubSpotContact[]
  paging?: {
    next?: {
      after: string
      link: string
    }
  }
  accountId: number
  timestamp: string
}

export async function fetchHubSpotContacts(): Promise<HubSpotContact[]> {
  try {
    const response = await fetch("https://dacodes.com/hs/serverless/demo", {
      next: { revalidate: 3600 }, // Revalidar cada hora
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.error(`Failed to fetch contacts: ${response.status} ${response.statusText}`)
      return []
    }

    const data: HubSpotResponse = await response.json()

    if (!data.success) {
      console.error("Failed to fetch contacts: API returned success=false")
      return []
    }

    return data.contacts || []
  } catch (error) {
    console.error("Error fetching HubSpot contacts:", error)
    return []
  }
}

