export default interface postInterface {
  _id?: string,
  user: {
    email: string,
    username: string,
    image: string, 
  },
  img: string,
  title: string,
  review: string,
  genre: string,
  type: string,
  rating: string,
  crowdRating: string,
  timestamp: any,
}