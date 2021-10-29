package mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.modelos;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "score")
public class Score implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    Integer value;
    String message;
    String hotel;

    @OneToOne(mappedBy = "score")
    Reservation reservation;
}
