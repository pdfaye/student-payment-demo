package devo.tech.studentpaymentdemo.repository;

import devo.tech.studentpaymentdemo.entities.Payment;
import devo.tech.studentpaymentdemo.entities.PaymentStatus;
import devo.tech.studentpaymentdemo.entities.PaymentType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByStudentCode(String code);
    List<Payment> findByStatus(PaymentStatus status);
    List<Payment> findByType(PaymentType type);

}
