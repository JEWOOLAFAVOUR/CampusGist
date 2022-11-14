import axios from "axios";

// import { showSnackBar } from "./SnackBar";

export const setTokenInterceptor = (data = {}, setToken = true, globalResponse = true) => {
    if (setToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    }

    if (globalResponse) {
        axios.interceptors.response.use(
            function (response) {
                return response;
            },
            function (error) {
                if (error.response.status === 409) {
                    console.log(err.response.data?.error)
                    // showSnackBar(err.response.data?.error, 'ERROR')
                }
            }
        )
    }

}