package mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.repositorios;

import java.util.List;
import java.util.Optional;
import mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.modelos.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.repositorios.crud.InterfaceAdmin;

@Repository
public class RepositorioAdmin {

    @Autowired
    private InterfaceAdmin crud;

    public List<Admin> getAll() {
        return (List<Admin>) crud.findAll();
    }

    public Optional<Admin> getAdmin(int id) {
        return crud.findById(id);
    }

    public Admin save(Admin admin) {
        return crud.save(admin);
    }

    public void delete(Admin admin) {
        crud.delete(admin);
    }

}
