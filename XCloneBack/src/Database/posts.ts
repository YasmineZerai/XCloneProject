// // import { promises } from "dns"
// // import { PostModel } from "../Models/posts"
// import { Post } from "../Models/posts"
// let posts: Post[]=[]
// import fs from 'fs'
// fs.readFile("src/Database/posts.txt",'utf-8',(err, data)=>{
//     if (err){
//         console.error('Error reading file:', err);
//         return;}

//     try{
//         posts=JSON.parse(data);
//     }
//     catch (parseErr) {
//         console.error('Error parsing JSON:', parseErr);
//     }
// })

// export  function createPost (post :Omit<Post, "postId">):number{
//     // return await PostModel.create()
//     const createdPost: Post = {...post, "postId":posts[posts.length-1].postId+1,}
//     posts.push(createdPost)
//     let updatedPosts=JSON.stringify(posts)
//     fs.writeFile("src/Database/posts.txt",updatedPosts,"utf-8",(err)=>{if (err) {
//         console.error('Error writing to file:', err);
//     } })
//     return createdPost.postId
// }
// export function listPosts(userId?:number) : Post[]{
//     if (!userId) return posts
//     return posts.filter(post=>{post.postedBy===userId})
// }
// export function getPost(postId:number):Post | null{
//     const existingPost =posts.find(post=>post.postId===postId)
//     return (existingPost?existingPost:null)
// }

// export function updatePost(postId:number,post:Post): number | null {
//     const existingPostIndex=posts.findIndex((post)=>post.postId===postId);
//     if (existingPostIndex===-1) {return null}
//     posts[existingPostIndex]=post
//     let updatedPosts=JSON.stringify(posts)
//     fs.writeFile("src/Database/posts.txt",updatedPosts,"utf-8",(err)=>{if (err) {
//         console.error('Error writing to file:', err);
//     } })
//     return postId;
// }

// export function deletePost(postId:number):number |null{
//     const existingPostIndex=posts.findIndex((post)=>post.postId===postId);
//     if (existingPostIndex===-1) {return null}
//     delete posts[existingPostIndex]
//     return existingPostIndex
// }

import { after } from "node:test";
import { Post, PostModel } from "../Models/posts";

type CreatePostArgs = {
  parentPost: string;
  description?: string;
  postedBy: string;
  images: string[];
};
type UpdatePostArgs = {
  images?: string[];
  description?: string;
};

export async function createPost(args: CreatePostArgs) {
  if (args.parentPost) {
    PostModel.findByIdAndUpdate(args.parentPost, {
      $inc: { retweetsCount: 1 },
    });
  }
  return await PostModel.create({
    parentPost: args.parentPost,
    description: args.description,
    postedBy: args.postedBy,
    images: args.images,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

export async function listPosts(userId?: string): Promise<Post[]> {
  if (userId !== undefined) return await PostModel.find({ postedBy: userId });
  return await PostModel.find();
}
export async function getPostById(postId: string): Promise<Post | null> {
  return await PostModel.findOne({ _id: postId });
}
export async function deletePost(postId: string) {
  return await PostModel.deleteOne({ _id: postId });
}
export async function updatePosts(args: UpdatePostArgs, id: string) {
  return await PostModel.findOneAndUpdate({ _id: id }, args, {
    returnDocument: "after",
  });
}
