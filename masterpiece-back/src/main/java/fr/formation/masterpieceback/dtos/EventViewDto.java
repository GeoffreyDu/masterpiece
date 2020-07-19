package fr.formation.masterpieceback.dtos;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public interface EventViewDto {
    String getTitle();
    LocalDateTime getDateTime();
    String getDescription();
    String getUserIdMail();
}
