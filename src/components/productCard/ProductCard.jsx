import './ProductCard.css';

function ProductCard({img, alt, title, author, viewDetails,moreInfo,children}) {
    return (
            <article className="product-card">
                <div className="image-wrapper">
                    {img ? (
                        <img src={img} alt={alt} />
                    ) : (
                        <div className="no-image">No image</div>
                    )}
                </div>
                        <div className="card-content">
                            <p><strong>Title: </strong>{title}</p>
                            <p><strong>Author: </strong>{author}</p>
                            <p><strong>Year: </strong>{viewDetails}</p>
                            {children}
                        </div>
            </article>
    );
}

export default ProductCard;