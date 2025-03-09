import type { LoadEvent } from '@sveltejs/kit';
import type { Folder } from '@flyingcatband/tunebook/types';

export const prerender = true;

// This is where the site gets the data for your tunes and sets
export function load({ fetch }: LoadEvent): Promise<{ folder: Folder }> {
       const basePath = import.meta.env.BASE_PATH || '';
       return fetch(`${basePath}/folder.json`)
		.then((res) => res.json())
		.then((folder) => ({
			folder
		}));
}
