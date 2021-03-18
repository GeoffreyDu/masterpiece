package fr.formation.masterpieceback.repositories;

import fr.formation.masterpieceback.dtos.EventViewDto;
import fr.formation.masterpieceback.entities.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface EventRepository extends JpaRepository<Event, Long> {
    EventViewDto getById(Long id);
    Page<EventViewDto> findAllByUserIdOrderByDateTimeAsc(Long userId, Pageable pageable);
    boolean existsByTitleAndDateTimeAndUserId(String title, LocalDateTime datetime, Long userId);
}
