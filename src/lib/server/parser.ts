import matter from 'gray-matter';
import { getPoem } from './poems';

export interface PoemMetadata {
    title: string;
    author: string;
    authorUrl?: string;
    source?: string;
    sourceUrl?: string;
    license?: string;
    licenseUrl?: string;
}

export interface Poem {
    index: number;
    metadata: PoemMetadata;
    content: string;
    snippet: string;
}

export function parsePoem(index: number, md: string): Poem {
    const { data, content } = matter(md);


    const snippet = content
        .replace(/\\\r?\n/g, '\n')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0 && !line.startsWith('#') && !line.startsWith('***'))
        .slice(0, 4)
        .join('\n');

    return {
        index,
        metadata: data as PoemMetadata,
        content,
        snippet
    };
}

export function getFullPoem(index: number): Poem {
    const md = getPoem(index);
    return parsePoem(index, md);
}
