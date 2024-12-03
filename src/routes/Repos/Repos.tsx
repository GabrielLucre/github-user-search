import { RepoProps } from "../../types/repo"

import Repo from "../../components/Repo/Repo" 
import BackBtn from "../../components/BackBtn/BackBtn" 

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import classes from "./Repos.module.css";
import Loader from "../../components/Loader/Loader"

const Repos = () => {
  const { username } = useParams();

  const [repos, setRepos] = useState<RepoProps[] | [] | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadrepos = async function (username: string) {
      setIsLoading(true);

      const res = await fetch(`https://api.github.com/users/${username}/repos`);

      const data = await res.json();

      setIsLoading(false);

      let orderedRepos = data.sort(
        (a: RepoProps, b: RepoProps) => b.stargazers_count - a.stargazers_count
      );

      orderedRepos = orderedRepos.slice(0, 5);

      setRepos(orderedRepos);
    };

    if (username) {
      loadrepos(username);
    }
  }, [username]);

  if (!repos && isLoading) return <Loader />;

  return (
    <div className={classes.repos}>
      <BackBtn />
      <h2>Explore os repositórios do usuário: {username}</h2>
      {repos && repos.length === 0 && <p>Não há repositórios.</p>}
      {repos && repos.length > 0 && (
          repos.map((repo: RepoProps) => (
            <Repo key={repo.name} {...repo} />
          ))
      )}
    </div>
  );
};

export default Repos;