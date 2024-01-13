import { useEffect } from "react";
import { useState } from "react"
import { Button, Container, Modal, Table } from "react-bootstrap"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllCategory } from '~/service/admin/adminService';

const FixModal = (props) => {
    return (<>
        <Modal {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title>SỬA THÔNG TIN</Modal.Title>
            </Modal.Header>
            <Modal.Body className="grid-example">
                <Container>
                    <div className="mb-3 form-floating">
                        <input type="text" className="form-control rounded-0" id="floatingInput" placeholder="Tên sản phẩm" />
                        <label htmlFor="floatingInput">Tên Thương hiệu</label>
                    </div>
                    <div className="mb-3 form-floating">
                        <input type="text" className="form-control rounded-0" id="floatingInput" placeholder="Kiểu dữ liệu" />
                        <label htmlFor="floatingInput">Thông tin</label>
                    </div>
                </Container>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} className="btn-secondary">Đóng</Button>
                <Button onClick={props.onHide} >Lưu</Button>
            </Modal.Footer>
        </Modal>
    </>)
}
const DeleteModal = (props) => {
    return (<>
        <Modal {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title className="fw-bold w-100 text-center">XÓA THÔNG TIN</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center fw-bold text-danger  " >
                <h5> Xác nhận xóa ?</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} className="btn-secondary">Đóng</Button>
                <Button onClick={props.onHide} className="btn-danger" >Xóa</Button>
            </Modal.Footer>
        </Modal>
    </>)
}
const AdminCategory = () => {
    const [dataCategory, setdataCategory] = useState([]);
    const fetchAllCategorys = async () => {
        const res = await fetchAllCategory()
        res && setdataCategory(res)

    }
    const navigate = useNavigate()
    const { isAdmin } = useSelector(state => state.account)
    useEffect(() => {
        fetchAllCategorys()
        isAdmin === false && navigate("/")
    }, [isAdmin]

    )

    const [fixModal, setFixModalShow] = useState(false);
    const [deleteModal, setdeleteModal] = useState(false);
    return (<>
        <Container className="my-5">
            <h1 className="text-center text-danger fw-bold ">Quản Lý Loại Sản Phẩm</h1>
            <Table>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th>Xóa/ Sửa</th>
                    </tr>
                </thead>
                <tbody>
                    {dataCategory && dataCategory.map((item, index) =>
                    (
                        <tr>
                            <td>{item.categoryId}</td>
                            <td> {item.name} </td>
                            <td><button className='btn btn-warning ' onClick={() => { setFixModalShow(true); fetchAllCategorys() }} >Sửa</button> <button className='btn btn-danger' onClick={() => { setdeleteModal(true) }} >Xóa</button></td>
                        </tr>
                    )
                    )}
                </tbody>
            </Table>
        </Container>
        <FixModal
            show={fixModal}
            onHide={() => setFixModalShow(false)}
        />
        <DeleteModal
            show={deleteModal}
            onHide={() => setdeleteModal(false)}
        />
    </>)
}
export default AdminCategory