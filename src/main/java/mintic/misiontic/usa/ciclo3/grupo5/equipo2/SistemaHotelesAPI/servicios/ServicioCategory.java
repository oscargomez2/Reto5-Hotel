package mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.servicios;

import java.util.List;
import java.util.Optional;
import mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.modelos.Category;
import mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.repositorios.RepositorioCategory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServicioCategory {

    @Autowired
    private RepositorioCategory metodosCrud;

    public List<Category> getAll() {
        return metodosCrud.getAll();
    }

    public Optional<Category> getCategoria(int id) {
        return metodosCrud.getCategoria(id);
    }

    public void save(Category categoria) {
        if (categoria.getId() == null) {
            metodosCrud.save(categoria);
        } else {
            Optional<Category> evt = metodosCrud.getCategoria(categoria.getId());
            if (evt.isEmpty()) {
                metodosCrud.save(categoria);
            }
        }
    }

    public void update(Category category) {
        if (category.getId() != null) {
            Optional<Category> obtener = metodosCrud.getCategoria(category.getId());
            if (!obtener.isEmpty()) {
                if (category.getName() != null) {
                    obtener.get().setName(category.getName());
                }
                if (category.getDescription() != null) {
                    obtener.get().setDescription(category.getDescription());
                }
                metodosCrud.save(obtener.get());
            }
        }
    }

    public boolean delete(int id) {
        Optional<Category> obtener = getCategoria(id);
        if (!obtener.isEmpty()) {
            metodosCrud.delete(obtener.get());
            return true;
        }
        return false;
    }
}
