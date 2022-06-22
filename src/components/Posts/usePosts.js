import { useContext, useEffect, useState } from "react";
import { dataQueryArray } from "../../../firebase/dataQuery";
import FirestoreManager from "../../../firebase/FirestoreManager";
import { DependencyContext } from "../contextProviders";

function getIDdependency(dependencies, dependency) {
  let id = null;
  dependencies.forEach((element) => {
    if (element.name === dependency) {
      id = element.id;
    }
  });
  return id;
}

function existDependency(dependencies, dependency) {
  console.log(dependency);
  if (dependency === undefined) {
    return true;
  }

  let exist = false;
  dependencies.forEach((element) => {
    if (element.name === dependency) {
      exist = true;
    }
  });
  return exist;
}

export default function usePosts(dependency) {
  //list of the dependencies in the database
  const [dependencies, setDependencys] = useContext(DependencyContext);

  //list of the publications to show
  const [postsData, setPostsData] = useState([]);

  // value that shows if the dependency exists in the database
  const [dependencyExists, setDependencyExists] = useState(true);

  // id of the dependency
  const [dependency_id, setDependency_id] = useState(null);

  function filterPosts(tagList) {
    if (tagList.length > 0) {
      FirestoreManager.filterPosts(tagList, dependency_id).then((posts) => {
        setPostsData(posts);
      });
    }else{
      dataQueryArray(FirestoreManager.getPostsList(dependency_id)).then(
        (data) => {
          setPostsData(data);
        }
      );
    }
  }

  /***
   * Return the post every time the dependency changes
   */
  useEffect(() => {
    setDependencyExists(existDependency(dependencies, dependency));
    const currDependencyId = getIDdependency(dependencies, dependency);

    dataQueryArray(FirestoreManager.getPostsList(currDependencyId)).then(
      (data) => {
        setPostsData(data);
      }
    );

    setDependency_id(currDependencyId);
  }, [dependency]);

  return { postsData, dependencyExists, dependency_id, filterPosts };
}
