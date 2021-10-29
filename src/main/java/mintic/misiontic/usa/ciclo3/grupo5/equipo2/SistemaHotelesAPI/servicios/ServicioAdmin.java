package mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.servicios;

import java.util.List;
import java.util.Optional;
import mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.modelos.Admin;
import mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.repositorios.RepositorioAdmin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServicioAdmin {

    @Autowired
    private RepositorioAdmin metodosCrud;

    public List<Admin> getAll() {
        return metodosCrud.getAll();
    }

    public Optional<Admin> getAdmin(int id) {
        return metodosCrud.getAdmin(id);
    }

    public void save(Admin admin) {
        if (admin.getId() == null) {
            metodosCrud.save(admin);
        } else {
            Optional<Admin> evt = metodosCrud.getAdmin(admin.getId());
            if (evt.isEmpty()) {
                metodosCrud.save(admin);
            }
        }
    }

    public void update(Admin admin) {
        if (admin.getId() != null) {
            Optional<Admin> catcher = metodosCrud.getAdmin(admin.getId());
            if (!catcher.isEmpty()) {
                if (admin.getName() != null) {
                    catcher.get().setName(admin.getName());
                }
                if (admin.getEmail() != null) {
                    catcher.get().setEmail(admin.getEmail());
                }
                if (admin.getPassword() != null) {
                    catcher.get().setPassword(admin.getPassword());
                }
                metodosCrud.save(catcher.get());
            }
        }
    }

    public boolean delete(int id) {
        Optional<Admin> catcher = metodosCrud.getAdmin(id);  //metodosCrud atributo del repositorio Admin, getAdmin obtiene el objeto Admin de id=id
        if (!catcher.isEmpty()) {
            metodosCrud.delete(catcher.get());
            return true;
        }
        return false;
    }
}
