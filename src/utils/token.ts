import { password, username } from "@/env";

const PORTAL_URL = {
    AGOL: 'https://www.arcgis.com',
    ENTERPRISE: 'https://gis.mhfd.org/portal'
} as const;

type Environment = keyof typeof PORTAL_URL;

type Token = {
    token: string
    expires: number
    ssl: boolean
}

export const generateToken = async (portal: Environment): Promise<string> => {
    const searchParams = new URLSearchParams({
        username: username,
        password: password,
        client: 'requestip',
        expiration: '1440',
        f: 'json'
    });

    const response = await fetch(`${PORTAL_URL[portal]}/sharing/rest/generateToken`, {
        method: 'POST',
        body: searchParams,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to generate token');
    }

    const { token, expires } = await response.json() as Token;

    console.log(`Generated token expires at: ${new Date(expires).toISOString()}`);

    return token;
}