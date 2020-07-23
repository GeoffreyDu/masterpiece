package fr.formation.masterpieceback.dtos;


import java.time.LocalDateTime;

public interface EventViewDto {
    Long getId();
    String getTitle();
    LocalDateTime getDateTime();
    String getDescription();
    Long getUserId();
}
