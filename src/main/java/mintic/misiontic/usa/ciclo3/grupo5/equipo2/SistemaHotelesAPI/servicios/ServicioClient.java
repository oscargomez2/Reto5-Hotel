package mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.servicios;

import java.util.List;
import java.util.Optional;
import mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.modelos.Client;
import mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.repositorios.RepositorioClient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServicioClient {

    @Autowired
    private RepositorioClient metodosCrud;

    public List<Client> getAll() {
        return metodosCrud.getAll();
    }

    public Optional<Client> getClient(int id) {
        return metodosCrud.getClient(id);
    }

    public void save(Client categoria) {
        if (categoria.getIdClient() == null) {
            metodosCrud.save(categoria);
        } else {
            Optional<Client> evt = metodosCrud.getClient(categoria.getIdClient());
            if (evt.isEmpty()) {
                metodosCrud.save(categoria);
            }
        }
    }

    public void update(Client client) {
        if (client.getIdClient() != null) {
            Optional<Client> obtener = metodosCrud.getClient(client.getIdClient());
            if (!obtener.isEmpty()) {
                if (client.getEmail() != null) {
                    obtener.get().setEmail(client.getEmail());
                }
                if (client.getPassword() != null) {
                    obtener.get().setPassword(client.getPassword());
                }
                if (client.getName() != null) {
                    obtener.get().setName(client.getName());
                }
                if (client.getAge() != null) {
                    obtener.get().setAge(client.getAge());
                }
                metodosCrud.save(obtener.get());
            }
        }
    }

    public boolean delete(int id) {
        Optional<Client> obtener = metodosCrud.getClient(id);
        if (!obtener.isEmpty()) {
            metodosCrud.delete(obtener.get());
            return true;
        }
        return false;
    }
}
