package mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.modelos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import lombok.Data;

@Data
@Entity
@Table(name = "reservation")
public class Reservation implements Serializable {

    public Reservation() {
        status = "created";
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer idReservation;

    @Temporal(javax.persistence.TemporalType.TIMESTAMP)
    Date startDate;

    @Temporal(javax.persistence.TemporalType.TIMESTAMP)
    Date devolutionDate;
    
    String status;

    @ManyToOne
    @JoinColumn(name = "roomID")
    @JsonIgnoreProperties("reservations")
    Room room;

    @ManyToOne
    @JoinColumn(name = "clientID")
    @JsonIgnoreProperties({"reservations","messages"})
    Client client;
    
    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "scoreID")
    Score score;
}
