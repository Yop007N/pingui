// Importa Axios
//const axios = require('axios');

class UserAPI {
    constructor(baseUrl) {
        this.axiosInstance = axios.create({
            baseURL: baseUrl
        });
    }

    async registerUser(username, password) {
        try {
            const response = await this.axiosInstance.post('/api/users/register', {
                username,
                password
            });
            console.log('Registro exitoso:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al registrar:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async loginUser(username, password) {
        try {
            const response = await this.axiosInstance.post('/api/users/login', {
                username,
                password
            });
            console.log('Inicio de sesión exitoso:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al iniciar sesión:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async testProtectedRoute(token) {
        try {
            const response = await this.axiosInstance.get('/api/users/protected', {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Acceso a ruta protegida:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al acceder a ruta protegida:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
}

// Ejemplo de uso
const userApi = new UserAPI('http://localhost:3000');

// Estas funciones ahora devuelven promesas, así que podrías usarlas con async/await en el contexto de una aplicación más grande.
userApi.registerUser('nuevoUsuario', 'contraseñaSegura').catch(console.error);
userApi.loginUser('nuevoUsuario', 'contraseñaSegura').then(data => {
    // Aquí podrías guardar el token en alguna parte segura
    console.log('Token:', data.token);
}).catch(console.error);

// Suponiendo que tienes un token válido, lo usarías así:
// userApi.testProtectedRoute('tu_token_aquí').catch(console.error);

async function registerUser() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const resultElement = document.getElementById('registerResult');

    try {
        const response = await axios.post('http://localhost:3000/api/users/register', { username, password });
        resultElement.textContent = 'Registro exitoso: ' + JSON.stringify(response.data);
    } catch (error) {
        // Verifica si error.response y error.response.data existen antes de acceder a error.response.data.message
        if (error.response && error.response.data) {
            resultElement.textContent = 'Error al registrar: ' + error.response.data.message;
        } else {
            // Maneja casos donde error.response no existe
            resultElement.textContent = 'Error al registrar: ' + error.message;
        }
    }
}


// Función para iniciar sesión
async function loginUser() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const resultElement = document.getElementById('loginResult');

    try {
        const response = await axios.post('http://localhost:3000/api/users/login', { username, password });
        resultElement.textContent = 'Inicio de sesión exitoso. Token: ' + response.data.token;
        // Aquí también podrías guardar el token en localStorage o sessionStorage.
    } catch (error) {
        resultElement.textContent = 'Error al iniciar sesión: ' + error.response.data.message;
    }
}
