'use client'
import React, { useState, useEffect } from 'react';
import './login.css';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '../lib/action';
import { Button } from './button';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { UserContext, UserContextType } from '../login/ui/context/UserContext';
import { IUser } from '../login/domain/IUser';

const LoginForm: React.FC = () => {
    const [errorMessage, dispatch] = useFormState(authenticate,undefined);
    // const
    // const [errorCreatedUser, CreatedUser ] = (register, undefined);
  // Tipos explícitos para el estado
  const [showLoginForm, setShowLoginForm] = useState<boolean>(true);
  const { currentUser, setCurrentUser, isEdit, setIsEdit, registerUser } = React.useContext(UserContext) as UserContextType;
  const [reload, setReload] = useState(new Date());
  const [errorRegister, setErrorRegister] = useState<string | null>(null);
  const [registered, setRegistered] = useState<string | null>(null);

  // Ajusta el formulario visible según el ancho de pantalla
  const handleResize = (): void => {
    if (window.innerWidth > 850) {
      setShowLoginForm(true);
    }
  };

  // let errorRegister 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentUser((prevUser: IUser) => ({ ...prevUser, [name]: value }));
};

  const handleSubmitRegister = async (
    event: React.FormEvent<HTMLFormElement>
) => {
    event.preventDefault();
    try {
        const result = await registerUser(currentUser);
        console.log("result: ", result )
        if (result) {
            console.log("User successfully registered:", result);
            setRegistered("User successfully registered")
            console.log("errorRegister", errorRegister)
        } else {
            setErrorRegister("User registration failed or was invalid")
            console.log("errorRegister", errorRegister)
            console.warn("User registration failed or was invalid.");
        }
    } catch (error) {
        setErrorRegister("Error during registration:")
        console.log("errorRegister", errorRegister)
        console.error("Error during registration:", error);
    }
};

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const iniciarSesion = (): void => setShowLoginForm(true);
  const register = (): void => setShowLoginForm(false);

  useEffect(() => {
    // Si hay un mensaje registrado o de error, establece un temporizador
    if (registered || errorRegister || errorMessage) {
        const timer = setTimeout(() => {
            setRegistered(null);
            setErrorRegister(null);
        }, 5000); // 3000 ms = 3 segundos

        // Limpia el temporizador cuando el componente se desmonte o se actualice
        return () => clearTimeout(timer);
    }
}, [registered, errorRegister]);


  return (
    <div className="App">
      <main>
        <div className={`contenedor__todo ${showLoginForm ? 'show-login' : 'show-register'}`}>
          {/* Caja trasera */}
          <div className="caja__trasera">
            <div className="caja__trasera-login">
              <h3>¿Ya tienes una cuenta?</h3>
              <p>Inicia sesión para entrar en la página</p>
              <button onClick={iniciarSesion}>Iniciar Sesión</button>
            </div>
            <div className="caja__trasera-register">
              <h3>¿Aún no tienes una cuenta?</h3>
              <p>Regístrate para que puedas iniciar sesión</p>
              <button onClick={register}>Registrarse</button>
            </div>
          </div>

          {/* Login y Register */}
          <div className="contenedor__login-register">
            {/* Login */}
            <form action={dispatch} className="formulario__login">
              <h2>Iniciar Sesión</h2>
              <input type="text" name="email" placeholder="Correo Electrónico"
              pattern="^\w+([.\-_+]?[\w]+)*@\w+([.\-_]?\w+)*(\.\w{2,10})+$" />
              <input type="password" name="password" placeholder="Contraseña" />
              <LoginButton />
                <div  
              className="flex h-8 items-end space-x-1"
              aria-live='polite'
              aria-atomic='true'>
                {errorMessage && (
                  <>
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
                )}
              </div>
            </form>

            {/* Register */}
            <form onSubmit={handleSubmitRegister} className="formulario__register">
              <h2>Registrarse</h2>
              <input onChange={handleChange} required type="text" placeholder="Nombre" name='firstname'
              pattern='^[A-Za-zÀ-ÖØ-öø-ÿ ]{3,50}$'/>
              <input onChange={handleChange} required type="text" placeholder="Apellido" name='lastname'
              pattern='^[A-Za-zÀ-ÖØ-öø-ÿ ]{3,50}$'/>
              <input onChange={handleChange} required type="number" placeholder="Numero" name='phonenumber'
              pattern='/^\d{7,15}$'/>
              <input onChange={handleChange} required type="text" placeholder="Email" name='email'
              pattern="^\w+([.\-_+]?[\w]+)*@\w+([.\-_]?\w+)*(\.\w{2,10})+$" />
              <input onChange={handleChange} required type="password" placeholder="Password" name='password'
              pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$'/>

              <RegisterButton />
              <div 
                className="flex h-8 items-end space-x-1"
                aria-live='polite'
                aria-atomic='true'>
                  {registered || errorRegister  &&(
                    <>
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    {errorRegister?
                    
                      (<p className="text-sm text-red-500">{errorRegister}</p>):
                      (<p className="text-sm text-blue-500">{registered}</p>)
                    }
                    
                  </>
                  )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
export default LoginForm;
function LoginButton() {
    const { pending } = useFormStatus();
    return (
      <Button className="mt-4 w-full" aria-disabled={pending}>
        Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
    );
  }

  function RegisterButton() {
    const { pending } = useFormStatus();
    return (
      <button type="submit" className="mt-4 w-full" aria-disabled={pending}>
        Register <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </button>
    );
  }

// se registra y se guarda usuario en la base de datos 
/*Pendientes:

1- notificar sobre registro del usuario creado o la falla al registrar ✅
2- modificar los valores enviados por el front y guardados desde el backend, deacuerdo a los datos necesarios ✅
3 
*/
// Queda  pendiente organizar backend para que guarde todos los  datos en la dynamo ✅
// desde el front validacion de datos, password, email, name, phonenumber ✅
// realizar limpieza del formulario de registro 
// realizar corregir codigo por categoria y carpeta 