import { PulseLoader } from 'react-spinners'
import PostItem from './PostItem'
import { useGetPostsQuery } from './postsApiSlice'
import { STATUS } from '../../constants/constants'

const PostList = () => {
    const {
        data: posts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery('postsList', {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={'#FFF'} />

    if (isError) {
        content = <p className='errmsg'>{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = posts

        const postsContent = ids?.length
            && ids.map(postId => <PostItem key={postId} postId={postId} />)

        content = (
            <div className='blog-content__container'>
                {postsContent}
            </div>
        )
    }

    return content
}

export default PostList