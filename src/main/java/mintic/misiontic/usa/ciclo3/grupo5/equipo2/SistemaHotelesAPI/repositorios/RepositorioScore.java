package mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.repositorios;

import java.util.List;
import java.util.Optional;
import mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.modelos.Score;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.repositorios.crud.InterfaceScore;

@Repository
public class RepositorioScore {

    @Autowired
    private InterfaceScore crud;

    public List<Score> getAll() {
        return (List<Score>) crud.findAll();
    }

    public Optional<Score> getScore(int id) {
        return crud.findById(id);
    }

    public Score save(Score score) {
        return crud.save(score);
    }
}
