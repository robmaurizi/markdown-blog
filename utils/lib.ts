import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const getPath = (folder:string) => {
  return path.join(process.cwd(), `/${folder}`);
}

export const getFileContent = (filename:string, folder:string) => {
  const POSTS_PATH = getPath(folder);
  return fs.readFileSync(path.join(POSTS_PATH, filename), "utf-8");
}

export const getAllPosts = (folder:string, publiished:boolean = true) => {
  const POSTS_PATH = getPath(folder);

  return fs
    .readdirSync(POSTS_PATH)
    .filter(path => /\.md?$/.test(path))
    .map(filename => {
        const source = getFileContent(filename, folder);
        const slug = filename.replace(/\.md?$/, '');
        const { data } = matter(source);
        return {
            frontmatter: data,
            slug: slug
        };
    }).filter(post => {
        return post.frontmatter.isPublished === true
    }).sort( (a, b) => {
        return a.frontmatter.publishDate.replace(/\//g,'') - b.frontmatter.publishDate.replace(/\//g,'');
    }).reverse();
  }

export const getTerms = (folder:string, termType: string) => {
  let allTerms = new Set<string>();
  const posts = getAllPosts(folder);
  posts.map(post => {
    if (post.frontmatter[termType]) {
      post.frontmatter[termType].forEach((term: string) => allTerms.add(term))
    }
  });

  return Array.from(allTerms);
}

export const getTags = (folder:string) => {
  let allTags = new Set<string>();
  const posts = getAllPosts(folder);
  const published = posts.filter(post => {
      return post.frontmatter.isPublished === true
  });

  published.map(post => {
      post.frontmatter.tags.forEach((tag: string) => allTags.add(tag))
  });

  return Array.from(allTags);
}

export const getAllTagged = (folder:string, tag:string) => {
  const posts = getAllPosts(folder);
  const tagged = posts.filter(post => {
      return post.frontmatter.tags.includes(tag)
  });

  return tagged;
}

export const getAllTermPosts = (folder:string, term:string, termType:string) => {
  const posts = getAllPosts(folder).filter(post => {
    if (post.frontmatter[termType]) {
      return post.frontmatter[termType].includes(term)
    }
  });

  return posts;
}

export const getSinglePost = (slug:string, folder:string) => {
  const source = getFileContent(`${slug}.md`, folder);
  const { data, content } = matter(source);

  return {
    frontmatter: data,
    content,
  }
}

export const getResumeData = (folder:string) => {
  const resumeSource = getFileContent('resume.json', folder);
  return JSON.parse(resumeSource);
}

export const getHomeContent = (folder:string) => {
  const homeSource = getFileContent('home.md', folder);
  return homeSource;
}

export const slugify = (_string:string) => {
  return _string.toLowerCase().replace(/\s/g, '-');
}

export const deslugify = (_string:string) => {
  return _string.replace(/-/g, ' ');
}