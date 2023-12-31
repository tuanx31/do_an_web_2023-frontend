import './detailProduct.scss'



import { Col, Container, Row } from 'react-bootstrap';

import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import ImageViewer from 'react-simple-image-viewer';

import _ from 'lodash';


import { fetch1Product } from '~/service/users/product';
import { handleArray } from '~/service/tools';
import Uytin from '~/components/users/uytin/Uytin';


import * as actions from '~/store/actions';

import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';

const DetailProduct = (props) => {
    const navigate = useNavigate()
    const innitlistimg = {
        img1: "",
        img2: "",
        img3: "",
        img4: ""
    }

    const { idProduct } = useParams();

    const [product, setProduct] = useState({})

    const dispatch = useDispatch()
    const handleAddtoCart = (data) => {
        dispatch(actions.addToCart(data))
        toast.success("Thêm vào giỏ hàng thành công!");
    }
    const handleCheckout = (data) => {
        dispatch(actions.Abate(data))
        navigate('/checkout')
    }
    const fetchDetailProduct = async (id) => {
        try {
            if (id) {
                const dProduct = await fetch1Product(id);
                setProduct(dProduct);
            }
        } catch (error) {
        }
    }

    useEffect(() => {
        idProduct && fetchDetailProduct(idProduct);
    }, [idProduct])
    useEffect(() => {
        product.img && setCurrentImg("https://localhost:7139/resources/" + product.img);
        if (product.listImage) {
            var kq = handleArray(product.listImage);
            let _ListImg = _.cloneDeep(listImg);
            _ListImg.img1 = "https://localhost:7139/resources/" + kq[0];
            _ListImg.img2 = "https://localhost:7139/resources/" + kq[1];
            _ListImg.img3 = "https://localhost:7139/resources/" + kq[2];
            _ListImg.img4 = "https://localhost:7139/resources/" + kq[3];
            setListImg(_ListImg);
        }

        product.color && setListColor(handleArray(product.color))
        product.size && setListSize(handleArray(product.size))

    }, [product, idProduct])
    useEffect(() => {
        if (product.name) {
            document.title = product.name || "Chi Tiết sản phẩm";
        }
    }, [product.name]);
    const [listColor, setListColor] = useState([])
    const [listSize, setListSize] = useState([])
    const [color, setColor] = useState("")
    const [size, setSize] = useState("")
    const [amount, setAmount] = useState(1)

    const [currentImg, setCurrentImg] = useState();
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [listImg, setListImg] = useState(innitlistimg)

    const images = [
        listImg.img1, listImg.img2, listImg.img3, listImg.img4
    ];


    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    const handleClickImgs = (img, index) => {
        setCurrentImg(img);
        setPhotoIndex(index);
    }


    useEffect(() => {
        listColor.length > 0 && setColor(listColor[0])
        listSize.length > 0 && setSize(listSize[0])
    }, [listColor, listSize])
    return (
        <Container>
            <div className='routed fs-14px my-3'><Link to="" className='text-black'>Trang chủ</Link> / {product.name}</div>
            <Row className='gap-5 my-5'>
                <Col lg={5} className='col-12'>
                    <div className='imgup'>
                        <img src={currentImg} alt='hinh anh' width={"100%"} height={'auto'} onClick={() => openImageViewer(photoIndex)} />
                    </div>
                    <div className='imgdown'>
                        <div className='imgSmall'>
                            <img src={listImg.img1} alt='imgnho' onClick={() => handleClickImgs(listImg.img1, 0)} className={currentImg === listImg.img1 ? "active" : ""} />
                        </div>
                        <div className='imgSmall'>
                            <img src={listImg.img2} alt='imgnho' onClick={() => handleClickImgs(listImg.img2, 1)} className={currentImg === listImg.img2 ? "active" : ""} />
                        </div>
                        <div className='imgSmall'>
                            <img src={listImg.img3} alt='imgnho' onClick={() => handleClickImgs(listImg.img3, 2)} className={currentImg === listImg.img3 ? "active" : ""} />
                        </div>
                        <div className='imgSmall'>
                            <img src={listImg.img4} alt='imgnho' onClick={() => handleClickImgs(listImg.img4, 3)} className={currentImg === listImg.img4 ? "active" : ""} />
                        </div>

                    </div>
                </Col>
                <Col >
                    <div className='title-product mb-3 text-uppercase'>{product.name}</div>
                    <p className='category text-decoration-underline fs-14px mb-5'>{product.trademarks && product.trademarks.name}</p>
                    <div className='product-inf border-bottom'>
                        <div className='product-short-desc'>
                            <ul className='fs-14px'>
                                <li><strong>Brand: </strong><span style={{ color: "#002ED0" }}>{product.categories && product.categories.name}</span></li>
                                {product.description && <li>{product.description}</li>}
                                {product.design && <li><strong>Thiết kế: </strong><span >{product.design}</span></li>}
                                {product.material && <li><strong>Vật liệu: </strong><span style={{ color: "red" }}>{product.material}</span></li>}
                                {product.desc && <li className='text-muted'>{product.desc}</li>}
                                {product.consistent && <li><strong>Tương thích: </strong>{product.consistent}</li>}
                                {/* <li><strong>Combo gồm : </strong><span style={{ color: "#002ED0" }}>Bao da + Túi phụ kiện</span></li> */}
                                {product.color && <li><strong>Màu sắc : </strong><span className='text-muted'>{product.color}</span></li>}
                            </ul>
                        </div>
                        <p className='line-price'>
                            <span id="ProductPrice" className="ProductPrice fw-bold me-3" itemProp="price" >{product.price && (product.price - (product.sale_of / 100 * product.price)).toLocaleString()}₫</span>
                            <s id="ComparePrice" className="ComparePrice">{product.price && product.price.toLocaleString()}₫</s>
                        </p>
                        <p>
                            <em id="PriceSaving" className="PriceSaving">(Bạn sẽ tiết kiệm được {product.price && (product.price * product.sale_of / 100).toLocaleString()}₫)</em>
                        </p>
                    </div>
                    <div className='select-ops border-bottom'>
                        {listColor && listColor.length > 0 && <div className='color py-3 d-flex gap-3' >
                            <strong className='d-flex align-items-center'>Màu sắc :</strong>
                            <select name="select-color" className='shadow-sm form-select rounded-1 border-0' value={color} onChange={(e) => setColor(e.target.value)} id="color">
                                {
                                    listColor.length > 0 && listColor.map((item, index) => (
                                        <option key={item + index} value={item}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>}
                        {listSize && listSize.length > 0 && <div className='size py-3 d-flex gap-3'>
                            <strong className='d-flex align-items-center'>Kích thước :</strong>
                            <select className="form-select shadow-sm rounded-1 border-0" value={size} onChange={(e) => setSize(e.target.value)} >
                                {
                                    listSize.length > 0 && listSize.map((item, index) => (
                                        <option key={item + index} value={item}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>}
                    </div>
                    <div className='quantity-Product border-bottom py-4 d-flex gap-3'>
                        <label className='d-flex align-items-center'>Số Lượng : </label>
                        <input className='input-group rounded-1 border-1' type="number" id="quantity" value={amount} onChange={e => { setAmount(e.target.value) }} name="quantity" min="1" max="999999" />
                        <button className='btn btn-outline-primary rounded-1' onClick={() => handleCheckout({ ...product, soluong: Number(amount), colorCart: color, sizeCart: size })}  >Mua Ngay</button>
                        <button className='btn btn-outline-success rounded-1' onClick={() => handleAddtoCart({ ...product, soluong: Number(amount), colorCart: color, sizeCart: size })} >Thêm vào giỏ hàng</button>
                    </div>
                </Col>
            </Row>

            <Uytin />
            {
                isViewerOpen && (
                    <ImageViewer
                        src={images}
                        currentIndex={currentImage}
                        disableScroll={false}
                        closeOnClickOutside={true}
                        onClose={closeImageViewer}
                        backgroundStyle={{
                            backgroundColor: "rgba(0,0,0,0.9)"
                        }}
                    />
                )
            }
        </Container >


    )
}

export default DetailProduct