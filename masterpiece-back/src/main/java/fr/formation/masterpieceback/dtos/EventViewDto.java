package fr.formation.masterpieceback.dtos;


import java.time.LocalDateTime;
// DTO for frontend
public interface EventViewDto {
    Long getId();
    String getTitle();
    LocalDateTime getDateTime();
    String getDescription();
    Long getUserId();
}
