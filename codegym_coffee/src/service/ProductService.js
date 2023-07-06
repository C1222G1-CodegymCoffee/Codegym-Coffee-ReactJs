import axios from "axios";

export const findProductById = async (idProduct) => {
    try {
        const result = await axios.get(
            `http://localhost:8080/api/admin/product/${idProduct}`,
            {
                headers:
                    {
                        'Authorization': 'Bearer ' + sessionStorage.getItem("TOKEN"),
                    },
            }
        );
        return result.data;
    } catch (e) {
        console.log(e);
    }
};
export const saveProduct = async (productDTO) => {
    try {
        await axios.post(`http://localhost:8080/api/admin/product-create`, {...productDTO}, {
            headers:
                {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("TOKEN"),
                },
        });
    } catch (e) {
        console.log(e);
    }
};
export const updateProduct = async (productDTO) => {
    try {
        await axios.patch(`http://localhost:8080/api/admin/product-update/${productDTO.idProduct}`, {...productDTO},
            {
                headers:
                    {
                        'Authorization': 'Bearer ' + sessionStorage.getItem("TOKEN"),
                    },
            });
    } catch (e) {
        console.log(e);
    }
};
export const findProductTypeDTO = async () => {
    try {
        const result = await axios.get(
            `http://localhost:8080/api/admin/productType`, {
                headers:
                    {
                        'Authorization': 'Bearer ' + sessionStorage.getItem("TOKEN"),
                    }
            }
            )
        ;
        return result.data;
    } catch (e) {
        console.log(e);
    }
};