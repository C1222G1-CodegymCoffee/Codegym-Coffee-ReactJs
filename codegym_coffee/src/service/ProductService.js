import axios from "axios";
export const findProductById = async (id) => {
    try {
        const result = await axios.get(
            `http://localhost:8080/api/product/${id}`
        );
        return result.data;
    } catch (e) {
        console.log(e);
    }
};
export const save = async (product) => {
    try {
        await axios.post("http://localhost:8080/api/product/create", { ...product });
        console(product)
    } catch (e) {
        console.log(e);
    }
};
export const updateProduct = async (product) => {
    console.log(product);
    try {
        await axios.patch("http://localhost:8080/api/product/update/" + product.idProduct, {
            ...product,
        });
    } catch (e) {
        console.log(e);
    }
};
export const findProductType = async () => {
    try {
        const result = await axios.get(
            `http://localhost:8080/productType`
        );
        return result.data;
    } catch (e) {
        console.log(e);
    }
};