package mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.repositorios;

import java.util.List;
import java.util.Optional;
import mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.modelos.Client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.repositorios.crud.InterfaceClient;

@Repository
public class RepositorioClient {

    @Autowired
    private InterfaceClient crud;

    public List<Client> getAll() {
        return (List<Client>) crud.findAll();
    }

    public Optional<Client> getClient(int id) {
        return crud.findById(id);
    }

    public Client save(Client categoria) {
        return crud.save(categoria);
    }

    public void delete(Client category) {
        crud.delete(category);
    }
}
