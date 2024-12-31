"use client";

import { UserContext, UserContextType } from "@/app/login/ui/context/UserContext";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
// import '@/app/ui/login.css';

const UpdateForm: React.FC = () => {
  const { currentUser, updateUser } = React.useContext(UserContext) as UserContextType;
  const { data } = useSession();
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  // Cuando data esté disponible, actualizamos formData
  useEffect(() => {
    if (data?.user) {
      setFormData((prev) => ({
        ...prev,
        name: data.user?.name || "",
        lastname: data.user?.lastname || "",
        phoneNumber: data.user?.phonenumber || "",
        email: data.user?.email || "",
        password: "",
      }));
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdateMessage(null);
  
    try {
      // Solo enviamos los datos del formulario
      const updatedUser = { ...formData };
  
      await updateUser(updatedUser); // Llama a la función del contexto para actualizar el usuario
      setUpdateMessage("Perfil actualizado con éxito");
    } catch (err) {
      console.error("Error actualizando perfil:", err);
      setUpdateMessage("Error al actualizar el perfil");
    }
  };
  

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Image
          src={data?.user?.image || '/images/defaultImage.jpeg'}
          alt="Profile"
          width={60} // Ancho en píxeles
          height={60} // Altura en píxeles
          className="rounded-full cursor-pointer"
        />
        <div>
          <p>{data.user?.name + " "+  data.user?.lastname}</p>
          <p className="text-sm">{data.user?.email}</p>
        </div>
      </div>
        <h1>Actualizar perfil</h1>
      <div>
        <form onSubmit={handleSubmitUpdate}
        className="form-user-update">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
                     
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
            />
          
          
            <label htmlFor="phoneNumber">Phone number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            /> 

          <button type="submit">Update Profile</button>
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {updateMessage && (
              updateMessage === "Error al actualizar el perfil" ? (
                <>
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{updateMessage}</p>
                </>
              ) : (
                <p className="text-sm text-green-500">{updateMessage}</p>
              )
            )}
          </div>
        </form>
      </div>
    <div>
      <h1>Data User</h1>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div> 
    </> 
  );
};

export default UpdateForm;
