package mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.servicios;

import java.util.List;
import java.util.Optional;
import mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.modelos.Score;
import mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.repositorios.RepositorioScore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServicioScore {

    @Autowired
    private RepositorioScore metodosCrud;

    public List<Score> getAll() {
        return metodosCrud.getAll();
    }

    public Optional<Score> getScore(int id) {
        return metodosCrud.getScore(id);
    }

    public void save(Score score) {
        if (score.getId() == null) {
            metodosCrud.save(score);
        } else {
            Optional<Score> evt = metodosCrud.getScore(score.getId());
            if (evt.isEmpty()) {
                metodosCrud.save(score);
            }
        }
    }

    public void update(Score score) {
        if (score.getId() != null) {
            Optional<Score> catcher = metodosCrud.getScore(score.getId());
            if (!catcher.isEmpty()) {
                if (score.getValue() != null) {
                    catcher.get().setValue(score.getValue());
                }
                if (score.getMessage() != null) {
                    catcher.get().setMessage(score.getMessage());
                }
                if (score.getHotel() != null) {
                    catcher.get().setHotel(score.getHotel());
                }
                metodosCrud.save(catcher.get());
            }
        }
    }
}
