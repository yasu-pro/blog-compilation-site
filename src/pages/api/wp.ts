const fetchAPI = async (query: string, variables: object): Promise<object> => {
    const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string;
    const headers = { 'Content-Type': 'application/json' };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Fetchエラー:', error);
        throw error;
    }
}

export default fetchAPI
