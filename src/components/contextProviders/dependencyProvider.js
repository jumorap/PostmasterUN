import React, { createContext, useState, useEffect } from "react";
import { dataQueryById } from "../../../firebase/dataQuery";
import FirestoreManager from "../../../firebase/FirestoreManager";

export const DependencyContext = createContext();

export  function DependencyProvider({children}) {
  const [dependencys, setDependencys] = useState([]);
  useEffect(() => {
    dataQueryById(FirestoreManager.getDependenciesList()).then((data) => {
      setDependencys(data);
    });
  }, []);

  return (
    <DependencyContext.Provider value={[dependencys, setDependencys]}>
      {children}
    </DependencyContext.Provider>
  );
}
