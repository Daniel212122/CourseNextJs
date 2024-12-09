// import React, { ReactNode, useEffect, useState } from 'react';

// import { emptyUser } from '../../domain/IUser';
// // import { UIButton } from '@core/infrastructure/ui/components/UIButton';
// // import { UIDropdown } from '@core/infrastructure/ui/components/UIDropdown';
// // import { UIInput } from '@core/infrastructure/ui/components/UIInput';
// // import { UICheckbox } from '@core/infrastructure/ui/components/UICheckbox';
// import { UserContext, UserContextType } from '../context/UserContext'
// // import { Form, Row } from 'react-bootstrap';


// export type UserFormProps = {
//   setShowModal?: (show: boolean) => void;
//   onSubmit?: () => void;
// }

// export const UserForm: React.FC<UserFormProps> = ({ setShowModal }) => {
//   const { currentUser, setCurrentUser, isEdit, setIsEdit, registerUser } = React.useContext(UserContext) as UserContextType;
// //   const [localRoles, setLocalRoles] = useState<string[]>([roles![0]]);
//   const [reload, setReload] = useState(new Date());
//   const [changePasword, setChangePasword] = useState(!isEdit);
//   const handleToggleChangePasword = () => setChangePasword(!changePasword);
//   const [isValidEmail, setIsValidEmail] = useState(true);
//   const [isValidFirstName, setIsValidFirstName ] = useState(true);
//   const [isValidLastName, setIsValidLastName] = useState(true);
//   const [isValidPassword, setIsValidPassword] = useState(true);

//   const statusOptions = [
//     { label: 'ACTIVE', value: 'ACTIVE' },
//     { label: 'INACTIVE', value: 'INACTIVE' }
//   ];
  

// //   roles?.map((number) => ({
// //       label: number,
// //       value: number,
// //     }));

// //   const handleRolChange = (e: any) => {
// //     const { value } = e.target;
// //     console.log(value)
// //     //console.log(currentUser.roles)
// //     let _localRoles: string[] = [...currentUser.roles ?? []];

// //     if (e.target) {
// //       _localRoles = [value];
// //     } else {
// //       //console.log(localRoles.indexOf(value), 1)
// //       _localRoles.splice(localRoles.indexOf(value), 1);
// //     }
// //     currentUser.roles = _localRoles;
// //     setLocalRoles(_localRoles);
// //   }

//   const handleChange = (event: any) => {
//     // const { name, value } = event.target;
//     const { name, value, pattern } = event.target; // Extract pattern from the event
//     //console.log(name);
//     let _user = { ...currentUser, [name]: value };
//     setCurrentUser(_user);
//     if (pattern) {
//     // if (name == "email" && pattern) {
//       //if (!isEdit) {
//         const expression = new RegExp(pattern); // Create regex from the pattern
//         if(expression.test(value)) {
//           if (name == "email")
//             setIsValidEmail(true);
//           else if (name == "firstname")
//             setIsValidFirstName(true);
//           else if (name == "lastname")
//             setIsValidLastName(true);
//           else if (name == "password")
//             setIsValidPassword(true);
//         } else {
//           if (name == "email")
//             setIsValidEmail(false);
//           else if (name == "firstname")
//             setIsValidFirstName(false);
//           else if (name == "lastname")
//             setIsValidLastName(false);
//           else if (name == "password")
//             setIsValidPassword(false);

//         }
//      // }
//     }
//     //console.log(JSON.stringify(_user));
//     //console.log(JSON.stringify(currentUser));
//   };

//   const handleDropDownChange = (event: any) => {
//     //console.log(JSON.stringify(event.target));
//     const { name, value } = event.target;
//     //console.log(value);
//     let _user = { ...currentUser, [name]: value };
//     setCurrentUser(_user);
//     //console.log(JSON.stringify(_user));
//     //console.log(JSON.stringify(currentUser));
//   };

//   // Se debe validar como hacer el refresco del componente
//   const handleAdd = (event: any) => {
//     if (setShowModal) setShowModal(true);
//     //console.log(JSON.stringify(currentUser));
//     event.preventDefault();
//     setIsEdit(false);
//     setCurrentUser(emptyUser);
//     setReload(new Date());
//     //console.log(JSON.stringify(currentUser));
//   };

//   const handleSubmit = (event: any) => {
//     event.preventDefault();
//     // currentUser.roles = localRoles;
//     //console.log(currentUser);
//     // (!isEdit) ? registerUser(currentUser) : updateUser(currentUser);
//     if (setShowModal) setShowModal(false);
//     setReload(new Date());
//     //console.log(JSON.stringify(currentUser));
//   };

// //   const tooltipContent: ReactNode = (
// //     <>
// //       <p>{t("User.Create.Invalid")}</p>
// //     </>
// //   );

//   return (
    
//     <div className="mx-4 d-grid gap-3">
//       <form onSubmit={handleSubmit} method="post" className="mt-3">
//         <UIInput
//           required
//           label={t("User.Create.Email")}
//           name="email"
//           type="email"
//           value={currentUser.email}
//           onChange={handleChange}
//           disabled={isEdit}
//           autoComplete="off"
//           isInvalid={!isValidEmail}
//           msgInvalid={t("User.Create.Invalid")}          
//           pattern="^\w+([.\-_+]?[\w]+)*@\w+([.\-_]?\w+)*(\.\w{2,10})+$" // Pass the regex pattern as a string

//         />
//         <UIInput required label={t("User.Create.Name")} name="firstname" value={currentUser.firstname} onChange={handleChange} 
//                   isInvalid={!isValidFirstName}
//                   msgInvalid={t("User.Create.Invalid")}        
//                   pattern='^[A-Za-zÀ-ÖØ-öø-ÿ ]{3,50}$'
//                    /> 

//         <UIInput required label={t("User.Create.Lastname")} name="lastname" value={currentUser.lastname} onChange={handleChange} 
//                   isInvalid={!isValidLastName}
//                   msgInvalid={t("User.Create.Invalid")}        
//                   pattern='^[A-Za-zÀ-ÖØ-öø-ÿ ]{3,50}$'
//                   />
//         <UIInput required label={t("User.Create.Password")} name="password" type="password" value={currentUser.password} onChange={handleChange}
//           disabled={!changePasword} 
//           isInvalid={!isValidPassword}
//           msgInvalid={t("User.Create.Invalid")}        
//           pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$'
//           placeholder={t("User.Create.PasswordPlaceholder")}
//           overlayMsg={tooltipContent} 
//           autoComplete="new-password"/>
//         {/* <UIDropdown label={t("User.Create.Status")} name="status" value={currentUser.status ? currentUser.status : ""} onChange={handleDropDownChange} options={statusOptions} required={true} /> */}
//         {/* <UIDropdown label={t("User.Create.Role")} name="rol" value={currentUser.roles ? currentUser.roles[0] : ''} onChange={handleRolChange} options={roles!.map((number) => ({label: number, value: number}))} required={true} /> */}
        
//         {isEdit &&
//           <Form.Check // prettier-ignore          
//             type="switch"
//             id="custom-switch"
//             label={t("User.Update.Password")}
//             checked={changePasword}
//             onChange={handleToggleChangePasword}
//           />
//         }
//         <Row>
//           <div className="mx-auto text-center" style={{ marginTop: '2rem' }}>
//             {
//               //<UIButton label="Nuevo" type='reset' onClick={handleAdd} />
//             }
//             <UIButton label={t("User.Button.Cancel")} type="button" onClick={() => { 
//               if(setShowModal)
//             {setShowModal(false)}
//             }}/>
//             <UIButton label={(isEdit) ? t("User.Button.Update") : t('User.Button.Save')} />
//           </div>
//         </Row>
//       </form>
//     </div>
//   );

// } 