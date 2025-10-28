// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Essencial para autenticação

//
// Este é o seu firebaseConfig, atualizado com a SUA NOVA "Chave de API 2"
//
const firebaseConfig = {
  apiKey: "AIzaSyC14b3hur1xwXmO5Su_itnZUS-2vnGRrg", // <-- SUA NOVA CHAVE
  authDomain: "pocket-collection-tcc.firebaseapp.com",
  projectId: "pocket-collection-tcc",
  storageBucket: "pocket-collection-tcc.appspot.com",
  messagingSenderId: "767803313015",
  appId: "1:767803313015:web:e1f4025140b501706fdf72",
  measurementId: "G-CJWDLIV50H"
};
//
//
//

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta o "controlador" de autenticação para o resto do app
export const auth = getAuth(app);