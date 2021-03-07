import { Post } from "@/models";

function getTime(date: Date): number {
  return date ? date.valueOf() : 1;
}

export function sortPostsByPostedAtDate(posts: Post[]): Post[] {
  posts.sort((a: Post, b: Post): number => {
    if (getTime(a.postedAt) > getTime(b.postedAt)) return -1;
    if (getTime(a.postedAt) < getTime(b.postedAt)) return 1;
    return 0;
  });

  return posts;
}
