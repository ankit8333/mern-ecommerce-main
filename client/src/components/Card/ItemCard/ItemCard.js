import './ItemCard.css';
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { WishItemsContext } from '../../../Context/WishItemsContext';
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ItemCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { addToCart } = useContext(CartItemsContext);
  const { addItem: addToWishList } = useContext(WishItemsContext);

  const handleAddToCart = () => {
    addToCart({
      id: item._id,
      name: item.name,
      image: item.image,
      category: item.category,
      price: item.price,
      size: item.size,
      selectedSize: item.size[0], // ✅ Default selected size
    });
  };

  const handleAddToWishList = () => {
    addToWishList(item);
  };

  return (
    <div className="product__card__card">
      <div className="product__card">
        <div
          className="product__image"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={`https://shema-backend.vercel.app/public/${item.category}/${isHovered ? item.image[1]?.filename : item.image[0]?.filename}`}
            alt={item.name}
            className="product__img"
          />
        </div>

        <div className="product__card__detail">
          <div className="product__name">
            <Link to={`/item/${item.category}/${item._id}`}>
              {item.name}
            </Link>
          </div>

          <div className="product__description">
            <span>{item.description}</span>
          </div>

          <div className="product__price">
            <span>${item.price}</span>
          </div>

          <div className="product__card__action">
            <IconButton
              onClick={handleAddToWishList}
              sx={{ borderRadius: '20px', width: '40px', height: '40px' }}
            >
              <FavoriteBorderIcon sx={{ width: '22px', height: '22px', color: 'black' }} />
            </IconButton>

            <IconButton
              onClick={handleAddToCart}
              sx={{ borderRadius: '20px', width: '40px', height: '40px' }}
            >
              <AddShoppingCartIcon sx={{ width: '22px', height: '22px', color: 'black' }} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
