import { createContentLoader } from "vitepress";
interface Post {
    title: string
    url: string
    date: {
        time: number
        string: string
    }
    excerpt: string | undefined
}

declare const data: Post[]
export { data }


export default createContentLoader("*/*.md", {
    transform(raw): data {
        const postMap = {};
        const yearMap = {};
        const tagMap = {};
        const posts = raw.filter(({ url, frontmatter }) => {
            return frontmatter.title !== undefined
        })
            .map(({ url, frontmatter }) => {
                const result = {
                    title: frontmatter.title,
                    url,
                    date: formatDate(frontmatter.date),
                    abstract: frontmatter.abstract,
                    tags: frontmatter.tags || [],
                };
                postMap[result.url] = result;
                return result;
            })
            .sort((a, b) => b.date.time - a.date.time);

        posts.forEach((item) => {
            const year = item.date.string.substring(0, 5);
            if (!yearMap[year]) {
                yearMap[year] = [];
            }
            yearMap[year].push(item.url);

            item.tags.forEach((tag) => {
                if (!tagMap[tag]) {
                    tagMap[tag] = []
                }
                tagMap[tag].push(item.url)
            })
        });

        return {
            yearMap,
            postMap,
            tagMap,
        };
    },
});

function formatDate(raw: string): Post['date'] {
    const date = new Date(raw)
    date.setUTCHours(12)
    return {
        time: +date,
        string: date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }
}
