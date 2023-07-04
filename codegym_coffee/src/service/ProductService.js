import axios from "axios";
export const findProductById = async (idProduct) => {
    try {
        const result = await axios.get(
            `http://localhost:8080/api/product/${idProduct}`
        );
        return result.data;
    } catch (e) {
        console.log(e);
    }
};
export const saveProduct = async (productDTO) => {
    try {
        await axios.post(`http://localhost:8080/api/product/create`, { ...productDTO });
        console(productDTO)
    } catch (e) {
        console.log(e);
    }
};
export const updateProduct = async (productDTO) => {
    console.log(productDTO);
    try {
        await axios.patch(`http://localhost:8080/api/product/update/${productDTO.idProduct}`, { ...productDTO });
    } catch (e) {
        console.log(e);
    }
};
export const findProductTypeDTO = async () => {
    try {
        const result = await axios.get(
            `http://localhost:8080/productType`
        );
        return result.data;
    } catch (e) {
        console.log(e);
    }
};