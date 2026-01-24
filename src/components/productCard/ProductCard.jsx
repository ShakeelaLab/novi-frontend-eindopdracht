import './ProductCard.css';

function ProductCard({img, alt, title, author, view_details}) {
    return (
            <article className="product-card">
                        <div className="image-wrapper">
                            <img src={img} alt={alt}/>
                        </div>
                        <div className="card-content">
                            <p><strong>Title: </strong>{title}</p>
                            <p><strong>Author: </strong>{author}</p>
                            <p><strong>Year: </strong>{view_details}</p>
                        </div>
            </article>
    );
}

export default ProductCard;