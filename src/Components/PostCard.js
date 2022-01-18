import {Card} from "react-bootstrap"

const PostCard = ({post}) => {
    return (
        <Card key = {post.id} style={{  margin : '0 auto' }}>
                            <Card.Body>
                                <Card.Title as = 'h4'>{post.author}</Card.Title>
                            </Card.Body>
                            <Card.Img variant="top" src={post.download_url} style={ {width : 400 , height : 400}} />
                        </Card>
    )
}

export default PostCard
