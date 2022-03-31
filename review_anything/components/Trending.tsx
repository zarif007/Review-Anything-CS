import React, { useEffect, useState } from 'react'
import postInterface from '../interfaces/Post'
import { BiTrendingUp } from "react-icons/bi";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { BsFillStarFill } from 'react-icons/bs';
import { theme } from '../atoms/themeAtom';
import { useRecoilState } from 'recoil';


const Trending = () => {

  const [isDark, setIsDark] = useRecoilState(theme);

  const styles = {
      wrapper: `border-2 ${isDark ? 'border-gray-900 text-gray-300' : 'border-gray-200 text-gray-800'} mr-2`,
      trendingText: `font-bold text-2xl p-2`,
      trendingIcon: `h-10 w-6 sm:h-12 sm:w-8 ${isDark ? 'text-gray-200' : 'text-gray-800'} iconAnimation pt-1`,
      postWrapper: `flex flex-col p-2 pb-1`,
      postImg: `h-10 w-10 sm:h-12 sm:w-12 p-2 rounded-full cursor-pointer pt-2`,
      postDetailesWrapper: `flex items-center space-x-1  lg:space-x-2 font-semibold md:text-xs lg:text-sm`,
      genre: `bg-blue-500 hover:bg-blue-600 p-2 m-1 mt-0 rounded-2xl font-semibold text-xs iconAnimation hover:text-white text-white`,
  }

  const [posts, setPosts] = useState<postInterface[]>([]);

  useEffect(() => 
    onSnapshot(
      query(collection(db, 'posts'), 
      orderBy('timestamp', 'desc')), 
      snapshot => {
        let arr: any = [];
        snapshot.docs.map(sp => {
          arr.push(sp.data());
        })
        setPosts(arr);
      }), 
  [db]);

  return (
    <div className={styles.wrapper}>
      <div className='flex'>
        <p className={styles.trendingText}>Trending</p> 
        <BiTrendingUp className={styles.trendingIcon} />  
      </div>
      <div className='mb-8'>
        {
            posts.slice(0, 3).map((post: postInterface) => {
                return (
                    <div className={styles.postWrapper}>
                      <div className='flex space-x-2 items-center pb-2'>
                        <img src={post.img} className={styles.postImg} />
                        <p className='font-semibold text-blue-600 text-lg'>{post.title}</p>
                      </div>
                      <div className={styles.postDetailesWrapper}>
                        <div className={styles.genre}>{post.genre}</div>
                        <div className='flex space-x-0 lg:space-x-1 items-center'>
                          <p className=''>{post.rating}</p>
                          <BsFillStarFill className='text-yellow-500 h-6' />
                        </div>
                        <p>{post.review.slice(0, 18)}...</p>
                      </div>
                    </div>
                )
            })
        }
      </div>
      
    </div>
  )
}

export default Trending
