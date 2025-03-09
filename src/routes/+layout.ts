import type { LoadEvent } from '@sveltejs/kit';
import type { Folder } from '@flyingcatband/tunebook/types';

export const prerender = true;

// This is where the site gets the data for your tunes and sets
export function load({ fetch }: LoadEvent): Promise<{ folder: Folder }> {
       const basePath = '/ccas-tunebook'; //import.meta.env.BASE_PATH || '';

// Log the base path to see what it's resolving to
    console.log('BASE_PATH:', basePath);

    // Log the full URL being requested
    const folderUrl = `${basePath}/folder.json`;
    console.log('Fetching data from:', folderUrl);

    return fetch(folderUrl)
        .then((res) => {
            if (!res.ok) {
                // Log an error if the request fails
                console.error('Failed to fetch folder.json:', res.statusText);
            }
            return res.json();
        })
        .then((folder) => {
            console.log('Fetched folder data:', folder); // Log the fetched data
            return { folder };
        })
        .catch((error) => {
            console.error('Error fetching folder.json:', error); // Log any errors
            throw error; // Ensure the error is thrown and handled elsewhere
        });
}
