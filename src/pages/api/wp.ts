import type { NextApiRequest, NextApiResponse } from 'next';
import fetchAPI from '../../lib/fetchAPI';

type Data = {
    data?: any;
    error?: string;
};

export default async function handler(
        req: NextApiRequest,
        res: NextApiResponse<Data>
    ) {
    if (req.method !== 'POST') {
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return;
    }

    const { query } = req.body;
    try {
        const data = await fetchAPI(query, {
        variables: {},
        });
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}
