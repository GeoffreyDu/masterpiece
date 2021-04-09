package fr.formation.masterpieceback.repositories;

import fr.formation.masterpieceback.dtos.EventViewDto;
import fr.formation.masterpieceback.entities.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
// Repository to communicate with the database
public interface EventRepository extends JpaRepository<Event, Long> {
    // Derived query methods
    Page<EventViewDto> findAllByUserIdOrderByDateTime(Long userId, Pageable pageable);
    boolean existsByTitleAndDateTimeAndUserId(String title, LocalDateTime datetime, Long userId);
}
