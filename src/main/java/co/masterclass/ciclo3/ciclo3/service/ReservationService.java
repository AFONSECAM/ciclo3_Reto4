package co.masterclass.ciclo3.ciclo3.service;

import co.masterclass.ciclo3.ciclo3.model.Reservation;
import co.masterclass.ciclo3.ciclo3.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAll() {
        return reservationRepository.getAll();
    }

    public Optional<Reservation> getReservation(int id) {
        return reservationRepository.getReservation(id);
    }

    public Reservation save(Reservation r) {
        if (r.getIdReservation() == null) {
            return reservationRepository.save(r);
        } else {
            Optional<Reservation> raux = reservationRepository.getReservation(r.getIdReservation());
            if (raux.isEmpty()) {
                return reservationRepository.save(r);
            } else {
                return r;
            }
        }
    }

    public Reservation update(Reservation r) {
        if (r.getIdReservation() != null) {
            Optional<Reservation> raux = reservationRepository.getReservation(r.getIdReservation());
            if (raux.isEmpty()) {
                if (r.getStartDate() != null) {
                    raux.get().setStartDate(r.getStartDate());
                }
                if (r.getDevolutionDate() != null) {
                    raux.get().setDevolutionDate(r.getDevolutionDate());
                }
                if (r.getStatus() != null) {
                    raux.get().setStatus(r.getStatus());
                }
                if (r.getScore() != null) {
                    raux.get().setScore(r.getScore());
                }
                if (r.getQuadbike() != null) {
                    raux.get().setQuadbike(r.getQuadbike());
                }
                if (r.getClient() != null) {
                    raux.get().setClient(r.getClient());
                }
                reservationRepository.save(raux.get());
                return raux.get();
            } else {
                return r;
            }
        }else{
            return r;
        }
    }

    public boolean delete(int id){
        Boolean rBoolean = getReservation(id).map(reservation -> {
            reservationRepository.delete(reservation);
            return true;
        }).orElse(false);
        return rBoolean;
    }
}
